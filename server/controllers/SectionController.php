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
    
    if($this->permission->check($this->request->getPost('context')[0], ROLE_LOCATIONADMIN, LEVEL_SECTION)) {
      $team->active = true;
      $team->approved = true;
    }
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
  
  public function acceptTeams() {
    $teams = Teams::find('section IN (' . implode(',', $this->request->getPost('context')) . ') AND id IN (' .
            implode(',', $this->request->getPost('teams')) . ')');
    return ['result' => $teams->update(['approved' => 1, 'active' => 1])];
  }
  
  public function rejectTeams() {
    $teams = Teams::find('section IN (' . implode(',', $this->request->getPost('context')) . ') AND id IN (' .
            implode(',', $this->request->getPost('teams')) . ') AND approved = 0');
    foreach($teams as $team) {
      $usersOnTeam = UsersToTeams::find('team = ' . $team->id);
      $usersOnTeam->delete();
    }
    return ['result' => $teams->delete()];
  }
  
  public function retireTeams() {
    $teams = Teams::find('section IN (' . implode(',', $this->request->getPost('context')) . ') AND id IN (' .
            implode(',', $this->request->getPost('teams')) . ') AND active = 1');
    return ['result' => $teams->update(['active' => 0])];
  }
}