<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class Refurbs extends Model
{
  public function validation()
  {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}