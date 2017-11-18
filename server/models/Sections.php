<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class Sections extends Model
{
  public function initialize() {
      $this->belongsTo('location', 'Locations', 'id', ['alias' => 'parent']);
      
      $this->hasMany('id', 'Teams', 'section');

  }

  public function validation() {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}