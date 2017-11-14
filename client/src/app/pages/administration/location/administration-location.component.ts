import { SharedAdministration } from './../administration-components/shared-administration.class';
import { LocationService } from './../../../shared/services/location.service';
import { SystemMessageService } from './../../../shared/services/systemMessage.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { SharedService } from '../../../shared/services/shared.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-administration-location',
    templateUrl: './administration-location.component.html'
})

export class AdministrationLocationComponent {
  context: SharedAdministration;
  constructor(public sharedService: SharedService, public locationService: LocationService) {
    this.context = new SharedAdministration(locationService, sharedService);
  }
}
