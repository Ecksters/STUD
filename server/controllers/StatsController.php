<?php
use Phalcon\DI\Injectable;
use Phalcon\DI;

class StatsController extends Injectable {
  private $levels = ['section', 'location', 'region', 'system'];
  
  protected $levelName = 'level';
  protected $levelProperName = 'Level';
  protected $LevelClass = 'Levels';
  
  function __construct() {
    $this->LevelProperName = ucfirst($this->levelName);
    $this->LevelClass = $this->levelProperName . 's';
    $this->setDI(DI::getDefault());
  }
  
  public function getStats() {
    return ['submitLeaders' => $this->getLeaders('Submit'), 'verifyLeaders' => $this->getLeaders('Verify')];
  }
  
  private function getLeaders($leaderType) {
    if($this->levelName == 'section') {
      $contextColumn = 'section' . $leaderType;
    } else {
      $contextColumn = $this->levelName;
    }
    
    if($this->levelName == 'system') {
      $contextCheck = '';
    } else {
      $contextCheck =   " AND " . $contextColumn . " = " . $this->request->getPost('context')[0];
    }

    $leaders = $this->db->query("
    SELECT COUNT(*) as count, user, name
    FROM (
    SELECT refurbs.*, users_to_teams.user, users.name
    FROM refurbs
    INNER JOIN teams ON teams.id = refurbs.team" . $leaderType . "
    INNER JOIN users_to_teams ON teams.id = users_to_teams.team
    INNER JOIN users ON users_to_teams.user = users.id
    WHERE refurbs.team" . $leaderType . " IS NOT NULL" . $contextCheck . "
    UNION
    SELECT refurbs.*, users.id as user, users.name
    FROM refurbs
    INNER JOIN users ON refurbs.submitter" . $leaderType . " = users.id
    WHERE refurbs.team" . $leaderType . " IS NULL AND submitter" . $leaderType . " IS NOT NULL" . $contextCheck . "
    ) submissions
    GROUP BY user
    ORDER BY count DESC
    LIMIT 10");
    $leaders->setFetchMode(\Phalcon\Db::FETCH_ASSOC);
    return $leaders->fetchAll();
  }
}