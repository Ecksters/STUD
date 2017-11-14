<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class Locations extends Model
{
  public function initialize() {
    $this->belongsTo('region', 'Regions', 'id');
    $this->hasMany('id', 'Sections', 'location');
  }
  
  public function validation()
  {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}