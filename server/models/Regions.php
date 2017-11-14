<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class Regions extends Model
{
  public function initialize(){
    $this->hasMany('id', 'Locations', 'region');
  }
  
  public function validation()
  {
    $validator = new Validation();

    $validator->add(
        'name',
        new UniquenessValidator([
        'message' => 'Region name already taken'
    ]));
    
    return $this->validate($validator);
  }
}