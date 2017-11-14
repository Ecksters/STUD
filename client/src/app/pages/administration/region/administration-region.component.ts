import { SharedAdministration } from './../administration-components/shared-administration.class';
import { RegionService } from './../../../shared/services/region.service';
import { SharedService, Role, Level  } from '../../../shared/services/shared.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';

@Component({
    selector: 'app-administration-region',
    templateUrl: './administration-region.component.html'
})
export class AdministrationRegionComponent {
    context: SharedAdministration;
    constructor(public sharedService: SharedService, public regionService: RegionService) {
      this.context = new SharedAdministration(regionService, sharedService);
    }
}
