<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class Teams extends Model
{
  public function initialize()
  {
    $this->hasManyToMany(
      'id',
      'UsersToTeams',
      'team',
      'user',
      'Users',
      'id',
      ['alias' => 'users']
    );
    
    $this->belongsTo('section', 'Sections', 'id', ['alias' => 'parentSection']);
  }
  public function validation()
  {
    $validator = new Validation();
    
    $validator->add(
        ['section','name'],
        new UniquenessValidator([
        'message' => 'Team name is taken'
    ]));
    
    return $this->validate($validator);
  }
}