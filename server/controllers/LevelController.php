<?php
use Phalcon\DI\Injectable;
use Phalcon\DI;

class LevelController extends Injectable {
  private $levels = ['section', 'location', 'region', 'system'];
  
  protected $levelName = 'level';
  protected $levelProperName = 'Level';
  protected $LevelClass = 'Levels';
  
  private $childName = 'child';
  private $childProperName = 'Child';
  private $ChildClass = 'Childs';
  
  private $parentName = 'parent';
  private $parentProperName = 'Parent';
  private $ParentClass = 'Parents';
  
  function __construct() {
    $levelIndex = array_search($this->levelName, $this->levels);
    if ($levelIndex !== 3) { // Region and below
      $this->parentName = $this->levels[$levelIndex + 1];
    }
    if ($levelIndex > 0) { // Location and above
        $this->childName = $this->levels[$levelIndex - 1];
    }
    foreach (['level', 'child', 'parent'] as $relation) {
      $this->{$relation . 'ProperName'} = ucfirst($this->{$relation . 'Name'});
      $this->{ucfirst($relation) . 'Class'} = $this->{$relation . 'ProperName'} . 's';
    }
    $this->setDI(DI::getDefault());
  }
  
  public function updateLevel() {
    $level = $this->LevelClass::findFirstById($this->request->getPost('context')[0]);
    $levelAccessCode = AccessCodes::findFirst(
        'context = ' . $this->request->getPost('context')[0] . 
        ' AND level = '. constant('LEVEL_' . strtoupper($this->levelName)));
    
    if($level->update($this->request->getPost('level'), ['name']) &&
       $levelAccessCode->update($this->request->getPost('level'), ['code', 'uses', 'expirationDate'])) {
      $this->permission->updatePermissions();
      return ['level' => $level->id];
    } else {
      return ['reason' => UsersController::errorArray($level)];
    }
  }
  
  public function createChild() {
    $child = new $this->ChildClass();
    $child->name = $this->request->getPost('name', 'string');
    if($this->levelName !== 'system') {
      $child->{$this->levelName} = $this->request->getPost('context')[0];
    }
    $accessCode = new AccessCodes();
    $accessCode->code = $this->request->getPost('accessCode', 'string');
    $accessCode->level = constant('LEVEL_' . strtoupper($this->childName));
    $accessCode->uses = $this->request->getPost('uses', 'int');
    if(!empty($this->request->getPost('expirationDate', 'string'))) {
      $accessCode->expirationDate = $this->request->getPost('expirationDate', 'string');
    }
    if($child->save()) {
      $accessCode->context = $child->id;
      if($accessCode->save()) {
        $this->permission->updatePermissions();
        return ['level' => $child->id];
      } else {
        $child->delete();
        return ['reason' => UsersController::errorArray($accessCode)];
      }
    } else {
      return ['reason' => UsersController::errorArray($child)];
    }
  }
  
  public function disableLevel() {
    $children = $this->LevelClass::find([
        'id IN ( {levels:array} )',
        'bind' => ['levels' => $this->request->getPost('context')]
    ]);
    if($children->update(['active' => 0])) {
      $this->permission->updatePermissions();
      $results = [];
      foreach($children as $child) {
        $results[] = $child->id;
      }
      return ['levels' => $results];
    } else {
      return ['reason' => [['message' => 'Could not disable.']]];
    }
  }
  
  public function getAccessCodes() {
    $accessCodes = [];
    if($this->levelName !== 'system' &&
       $this->permission->check($this->request->getPost('context')[0],
               constant('ROLE_' . strtoupper($this->parentName) . 'ADMIN'),
               constant('LEVEL_' . strtoupper($this->levelName)))) {
      $accessCodes['level'] = AccessCodes::findFirst(
      'context = ' . (int) $this->request->getPost('context')[0] . ' AND level = ' . constant('LEVEL_' . strtoupper($this->levelName)));
    }
    
    if($this->levelName !== 'section') {
      $notSystem = "";
      if($this->levelName !== 'system') { //This line is only added if it's not system
        $notSystem = "INNER JOIN $this->LevelClass ON $this->ChildClass.$this->levelName = $this->LevelClass.id";
      }
      $childAccessCodes = $this->modelsManager->executeQuery(
        "SELECT AccessCodes.* FROM AccessCodes
        INNER JOIN $this->ChildClass ON AccessCodes.context = $this->ChildClass.id
        $notSystem
        WHERE AccessCodes.level = " . constant('LEVEL_' . strtoupper($this->childName)));
      foreach ($childAccessCodes as $accessCode) {
        $accessCodes['children'][$accessCode->context] = $accessCode;
      }
    }
    
    return $accessCodes;
  }
  
  public function editAccessCode() {
    $newAccessCode= $this->request->getPost('accessCode');
    $accessCode = AccessCodes::findFirstById($newAccessCode['id']);
    if ($accessCode->update($newAccessCode, ['code', 'uses', 'expirationDate'])) {
      return $accessCode;
    }
    return ['reason' => UsersController::errorArray($accessCode)];
  }
  
  public function getUsers() {
    $locationAdmin = ($this->levelName === 'location' || $this->levelName === 'region') ? ' OR (UsersToRoles.role BETWEEN 4 AND 5 AND context = Locations.id)' : '';
    $regionAdmin =  ($this->levelName === 'region') ? ' OR (UsersToRoles.role = 6 AND UsersToRoles.context = Regions.id)' : '';
    $users = $this->modelsManager->executeQuery("
    SELECT UsersToRoles.user, MAX(UsersToRoles.role) as role, context, Users.name, Sections.id as section, Locations.id as location, Regions.id as region
    FROM UsersToRoles
    INNER JOIN Users on UsersToRoles.user = Users.id
    LEFT JOIN Sections ON UsersToRoles.role <= 3 AND UsersToRoles.context = Sections.id
    LEFT JOIN Locations ON Sections.location = Locations.id" . $locationAdmin . "
    LEFT JOIN Regions ON Locations.region = Regions.id" . $regionAdmin . "
    WHERE " . $this->LevelClass . ".id IN (" . implode(',',$this->request->getPost('context')) .
      ") AND (Regions.active = 1) AND (Locations.active = 1 OR Locations.active IS NULL) AND (Sections.active = 1 OR Sections.active IS NULL)
    GROUP BY user
    ORDER BY region, location, section, role, Users.name");
    //var_dump($this->modelsManager->getLastQuery()->getSql());
    return $users->toArray();
  }
}