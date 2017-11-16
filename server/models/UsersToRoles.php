<?php
use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Query;
use Phalcon\Di;

class UsersToRoles extends Model
{
  // Step 1: Find out which sections they are in, assume User role for those sections, and work up adding them to the correct locations/regions for their sections.
  // Step 2: Find designated roles and add or overwrite roles, looking up child levels and cascading down to Section level
  // Final array is indexed by Role, within each role, an array indexed by Place ID, which contains the role in that place.
  
  public static function getRolesAndScope($user) {
    $db = Di::getDefault()->get('modelsManager');
    $userRoles = [];
    $scope = [];
    
    
    //Optimized Query for Single-Section only users (almost all users)
    $results = $db->executeQuery(
      "SELECT UsersToRoles.user, UsersToRoles.role, UsersToRoles.context, Sections.id AS section, Sections.name AS sectionName, Locations.id AS location, Locations.name AS locationName, Regions.id AS region, Regions.name AS regionName
      FROM UsersToRoles
      LEFT JOIN Sections ON UsersToRoles.role <= " . ROLE_SECTIONMOD . " AND UsersToRoles.context = Sections.id
      LEFT JOIN Locations ON Sections.location = Locations.id OR (UsersToRoles.role BETWEEN " . ROLE_LOCATIONMOD . " AND " . ROLE_LOCATIONADMIN . " AND UsersToRoles.context = Locations.id)
      LEFT JOIN Regions ON Locations.region = Regions.id OR (UsersToRoles.role = " . ROLE_REGIONADMIN . " AND UsersToRoles.context = Regions.id) OR UsersToRoles.role = " . ROLE_SYSTEMADMIN . "
      WHERE UsersToRoles.user = :userID: AND (Regions.active = 1 OR Regions.active IS NULL) AND (Locations.active = 1 OR Locations.active IS NULL) AND (Sections.active = 1 OR Sections.active IS NULL)
      ORDER BY UsersToRoles.role", [
      'userID' => $user
    ]);
    
    //var_dump($db->getLastQuery()->getSql());
    $regions = [];
    $highestRole = ROLE_GUEST;
    foreach ($results as $result) {
      $highestRole = ($result->role > $highestRole) ? $result->role : $highestRole;
      if (is_null($result->section)) {
        $locations = is_null($result->location) ? Locations::findByRegion($result->region) : Locations::findById($result->location);
        foreach ($locations as $location) {
          $sections = Sections::findByLocation($location->id);
          foreach ($sections as $section) {
            $userRoles[LEVEL_SECTION][$section->id] = $result->role;
          }
          $userRoles[LEVEL_LOCATION][$location->id] = $result->role;
        }
      } else {
        $userRoles[LEVEL_SECTION][$result->section] = $result->role;
        $userRoles[LEVEL_LOCATION][$result->location] = $result->role;
      }
      $userRoles[LEVEL_REGION][$result->region] = $result->role;
      $regions[] = (int) $result->region;
    }
    $userRoles[LEVEL_SYSTEM][0] = $highestRole;
    if(!empty($regions)) {
      $results = $db->executeQuery(
        "SELECT Regions.id AS region, Regions.name AS regionName, Locations.id AS location, Locations.name AS locationName, Sections.id AS section, Sections.name AS sectionName
        FROM Regions
        LEFT JOIN Locations ON Locations.region = Regions.id
        LEFT JOIN Sections ON Sections.location = Locations.id
        WHERE Regions.id IN ( {regions:array} )  AND (Regions.active = 1 OR Regions.active IS NULL) AND (Locations.active = 1 OR Locations.active IS NULL) AND (Sections.active = 1 OR Sections.active IS NULL)
        ORDER BY Regions.id, Locations.id, Sections.id", [
        'regions' => $regions
      ]);
    } else {
      $results = [];
    }

    foreach ($results as $result) {
      if(!isset($scope[$result->region][$result->location][$result->section]['name'])) {
        $scope[$result->region]['name'] = $result->regionName;
        $scope[$result->region][$result->location]['name'] = $result->locationName;
      }
      $scope[$result->region][$result->location][$result->section]['name'] = $result->sectionName;
    }
    
    self::arrayValuesToInt($userRoles);
    self::array_filter_recursive($scope);
    return ['roles' => $userRoles, 'scope' => $scope];
  }
  
  private static function arrayValuesToInt(&$array) {
    if (is_array($array)) {
      foreach($array as &$arrayPiece){
        self::arrayValuesToInt($arrayPiece);
      }
    } else {
      $array = intval($array);
    }
  }
  
  private static function array_filter_recursive(&$input) {
    foreach ($input as &$value)
    {
      if (is_array($value)) 
      {
        $value = self::array_filter_recursive($value);
      }
    }
    return array_filter($input);
  } 
}
