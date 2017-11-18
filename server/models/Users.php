<?php
use Phalcon\Mvc\Model;

class Users extends Model
{
  public function initialize()
  {
    $this->hasManyToMany(
      'id',
      'UsersToTeams',
      'user',
      'team',
      'Teams',
      'id',
      ['alias' => 'teams']
    );
  }
}