<?php

class StatsByLocationController extends StatsController
{
   function __construct() {
     $this->levelName = 'location';
     parent::__construct();
   }
}