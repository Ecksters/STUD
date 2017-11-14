<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class RefurbsHistory extends Model
{
  public function validation()
  {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}