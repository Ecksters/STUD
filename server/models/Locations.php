<?php
use Phalcon\Mvc\Model;
use Phalcon\Validation;

class Locations extends Model
{
  public function initialize() {
    $this->belongsTo('region', 'Regions', 'id', ['alias' => 'parent']);
    $this->hasMany('id', 'Sections', 'location', ['alias' => 'children']);
  }
  
  public function validation()
  {
    $validator = new Validation();
    
    return $this->validate($validator);
  }
}