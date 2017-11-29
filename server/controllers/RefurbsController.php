<?php

use Phalcon\Mvc\Controller;

class RefurbsController extends Controller
{
  public function add() {
    $refurbData = array_filter($this->request->getPost('refurb'), 'strlen');
    $sectionId = $this->request->getPost('context')[0];
    
    $sectionLineage = $this->sectionLineage($sectionId);
    
    $refurbData['sectionSubmit'] = $sectionId;
    $refurbData['location'] = $sectionLineage->location;
    $refurbData['region'] = $sectionLineage->region;
    $refurbData['submitterSubmit'] = $this->session->get('user')['id'];
    
    $refurb = new Refurbs();
    if ($refurb->create($refurbData, ['region', 'location', 'sectionSubmit', 'submitterSubmit', 'teamSubmit',
        'formFactor', 'manufacturer', 'model', 'color', 'size', 'state',
        'processor', 'ram', 'storage', 'storageType', 'os'])) {
      $refurbHistory = new RefurbsHistory();
      $refurbHistory->create(['refurb' => $refurb->id, 'user'=>$this->session->get('user')['id'], 'editedValue' => 'Created']);
      return $refurb;
    }
    return ['reason' => UsersController::errorArray($refurb)];
  }
  
  public function donate() {
    $donations = $this->request->getPost('refurbs');
    $location = $this->request->getPost('context')[0];
    if(!is_array($donations)) {
      return ['reason' => [['message' => 'Invalid format, use array of refurb IDs']]];
    }
    $this->modelsManager->executeQuery("
    UPDATE Refurbs
    SET donated = '" . date('Y-m-d H:i:s') . "'
    WHERE Refurbs.location = :location: AND Refurbs.id IN ( {donations:array} )",
    [
        'location' => $location,
        'donations' => $donations
    ]);
    return ['donated' => $donations];
  }
  
  public function verify() {
    $refurbData = array_filter($this->request->getPost('refurb'), 'strlen');
    $refurb = Refurbs::findFirstById($refurbData['id']);
    if($this->session->get('roles')[LEVEL_LOCATION][$this->request->getPost('context')[0]] < ROLE_LOCATIONADMIN) {
      if($refurb->teamSubmit != NULL) {
        foreach($this->session->get('teams') as $team) {
          if($refurb->teamSubmit == $team['id']) {
            throw new ErrorException('Cannot verify a refurb you or a team you are on submitted', 403, 10);
          }
        }
      }
      if($refurb->submitterSubmit == $this->session->get('user')['id']) {
            throw new ErrorException('Cannot verify a refurb you or a team you are on submitted', 403, 10);
      }
    }
    
    $refurbHistory = new RefurbsHistory();
    $refurbHistory->create(['refurb' => $refurb->id, 'user' => $this->session->get('user')['id'], 'editedValue' => 'Verified']);
    $mistakeDescription = $this->request->getPost('mistakeDescription');
    if(!empty($mistakeDescription)) {
      $refurbHistory = new RefurbsHistory();
      $refurbHistory->create(['refurb' => $refurb->id, 'user' => $this->session->get('user')['id'],
          'editedValue' => 'Verification Description', 'oldValue' => $refurb->submitterSubmit, 'newValue' => $mistakeDescription]);
    }
    
    $refurb->verified = date('Y-m-d H:i:s');
    $refurb->sectionVerify = $refurbData['sectionVerify'];
    $refurb->submitterVerify = $this->session->get('user')['id'];
    if(isset($refurbData['teamVerify'])) {
      $refurb->teamVerify = $refurbData['teamVerify'];
    }
    if(isset($refurbData['teamVerify'])) {
      $refurb->teamVerify = $refurbData['teamVerify'];
    }
   
    return $this->findChanges($refurb, $refurbData);
  }
  
  public function update() {
    $refurbData = array_filter($this->request->getPost('refurb'), 'strlen');
    $refurb = Refurbs::findFirstById($refurbData['id']);
    
    return $this->findChanges($refurb, $refurbData);
  }
  
  public function get() {
    $location =  $this->request->getPost('context')[0];
    $status = $this->request->getPost('status');
    if($status === 'unverified') {
      return Refurbs::find("location = $location AND verified IS NULL");
    } else if($status === 'verified') {
      return Refurbs::find("location = $location AND verified IS NOT NULL AND donated IS NULL");
    } else if($status === 'donated') {
      return Refurbs::find("location = $location AND donated IS NOT NULL"); //this should be limited later
    }
    return [];
  }
  
  private function findChanges($refurb, $refurbData) {
    $location = $this->request->getPost('context')[0];
    if($refurb->location === $location && $this->sectionLineage($refurbData['sectionVerify'])->location === $location
            && $this->permission->check($refurbData['sectionVerify'], ROLE_USER, LEVEL_SECTION)) {
      $updated = [];
      $updateable = ['formFactor', 'manufacturer', 'model', 'color', 'size', 'state',
            'processor', 'ram', 'storage', 'storageType', 'os'];
      foreach($updateable as $column) {
        if(isset($refurbData[$column]) && $refurb->$column != $refurbData[$column]) {
          $updated[$column] = $refurbData[$column];
          $refurbHistory = new RefurbsHistory();
          $refurbHistory->create(['refurb' => $refurb->id, 'user'=>$this->session->get('user')['id'],
              'editedValue' => $column, 'oldValue' => $refurb->$column, 'newValue' => $refurbData[$column]]);
        }
      }
      if ($refurb->update($updated)) {
        return $refurb;
      } else {
        return ['reason' => UsersController::errorArray($refurb)];
      }
    } else {
      throw new ErrorException('Invalid permissions for Location or Section sent', 403, 10);
    }
  }
  
  private function sectionLineage($sectionId) {
    return $this->modelsManager->executeQuery("
    SELECT Sections.id as section, Locations.id as location, Regions.id as region
    FROM Sections
    INNER JOIN Locations on Sections.location = Locations.id
    INNER JOIN Regions on Locations.region = Regions.id
    WHERE Sections.id = :sectionId:",
    [
        'sectionId' => $sectionId,
    ])->getFirst();
  }
}