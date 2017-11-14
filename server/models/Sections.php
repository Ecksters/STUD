<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class Sections extends Model
{
  public function initialize() {
      $this->belongsTo('location', 'Locations', 'id');
  }

  public function validation() {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}