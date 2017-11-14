<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class AccessCodes extends Model
{
  public function validation()
  {
    $validator = new Validation();

    $validator->add(
        'code',
        new UniquenessValidator([
        'message' => 'Access code is already in use'
    ]));
    
    return $this->validate($validator);
  }
}