<?php

class SectionController extends LevelController
{
  function __construct() {
     $this->levelName = 'section';
     parent::__construct();
  }
  
  public function createTeam() {
    $team = new Teams();
    $team->section = $this->request->getPost('context')[0];
    $team->name = $this->request->getPost('name');
    if(!$team->create()) {
      return ['reason' => UsersController::errorArray($team)];
    }
    $users = $this->request->getPost('users');
    foreach($users as $user) {
      $userOnTeam = new UsersToTeams();
      $userOnTeam->user = (int) $user;
      $userOnTeam->team = $team->id;
      $userOnTeam->save();
    }
    return ['result' => true];
  }
  
  public function approveTeams() {
    $teams = Teams::find('section = ' . $this->request->getPost('context')[0] . ' AND id IN (' .
            implode(',', $this->request->post('teams')) . ')');
    return ['result' => $teams->update(['approved' => 1, 'active' => 1])];
  }
  
  public function disableTeams() {
    $teams = Teams::find('section = ' . $this->request->getPost('context')[0] . ' AND id IN (' .
            implode(',', $this->request->post('teams')) . ') AND active = 1');
    return ['result' => $teams->update(['active' => 0])];
  }
  
  public function removeTeams() {
    $teams = Teams::find('section = ' . $this->request->getPost('context')[0] . ' AND id IN (' .
            implode(',', $this->request->post('teams')) . ') AND approved = 0');
    foreach($teams as $team) {
      $usersOnTeam = UsersToTeams::find('team = ' . $team->id);
      $usersOnTeam->delete();
    }
    return ['result' => $teams->delete()];
  }
  
  public function getTeams() {
    $teamsAndUsers = $this->modelsManager->executeQuery("
    SELECT UsersToTeams.user, UsersToTeams.team, Users.name as username, Teams.name, Teams.approved, Teams.created
    FROM UsersToRoles
    INNER JOIN Users on UsersToTeams.user = Users.id
    INNER JOIN Teams on UsersToTeams.team = Teams.id
    WHERE Teams.section = " . $this->request->getPost('context')[0] . " AND Teams.active = 1 OR Teams.approved = 0");
    $teams = [];
    $usersOnTeams = [];
    foreach($teamsAndUsers as $row) {
      if(!isset(teams[$row->team])) {
        $teams[$row->team]['id'] = $row->team;
        $teams[$row->team]['name'] = $row->name;
        $teams[$row->team]['approved'] = $row->approved;
        $teams[$row->team]['created'] = $row->created;
        $teams[$row->team]['users'] = [];
      }
      $teams[$row->team]['users'][$row->user] = $row->username;
      $usersOnTeams[] = ['user' => $row->user, 'team' => $row->team];
    }
    return ['teams' => $teams, 'usersOnTeams' => $usersOnTeams];
  }
}