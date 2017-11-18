<?php
use Phalcon\Mvc\Model;

class UsersToTeams extends Model
{
  public function initialize()
  {
      $this->belongsTo(
          'user',
          'Users',
          'id'
      );

      $this->belongsTo(
          'team',
          'Teams',
          'id'
      );
  }
}