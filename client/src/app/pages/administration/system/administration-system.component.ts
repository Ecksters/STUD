import { SharedAdministration } from './../administration-components/shared-administration.class';
import { Router } from '@angular/router';
import { SystemMessageService } from './../../../shared/services/systemMessage.service';
import { SharedService } from './../../../shared/services/shared.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormControl } from '@angular/forms';
import { SystemService } from '../../../shared/services/system.service';
import { Component, OnInit, Injector } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';


@Component({
    selector: 'app-administration-system',
    templateUrl: './administration-system.component.html'
})

export class AdministrationSystemComponent {
  context: SharedAdministration;
  constructor(public sharedService: SharedService, public systemService: SystemService) {
    this.context = new SharedAdministration(systemService, sharedService);
  }
  /*loading = false;
  serverErrors = [];
  newRegionId = 0;
  regions: any;

  constructor(public systemService: SystemService, public system: SystemMessageService,
              public sharedService: SharedService, private router: Router) {
      this.regions = JSON.parse(JSON.stringify(this.sharedService.scope));
      this.regions = Object.keys(this.regions).map(key => {
      this.regions[key].id = key;
      return this.regions[key];
    });
  }

  ngOnInit() {

  }

  createRegion(form: NgForm) {
    const value = form.value;
    this.loading = true;
    this.serverErrors = [];
    this.systemService.createRegion(value.newRegionName, value.newRegionAccessCode)
    .finally(() => {
      this.loading = false;
    }).subscribe(
    (results: any) => {
      if (results.region) {
        this.system.toastr.success('Created "' + value.newRegionName +
        '" Region Successfully.', 'New Region Created', {data: {url: '/'}});
        this.newRegionId = results.region;
        this.sharedService.refreshPermissions();
      } else {
        for (const error of results.reason) {
          this.serverErrors.push(error.message);
        }
      }
    },
    (error) => {
      this.serverErrors = ['Error occured, please try again.'];
    });

  }

  disableRegion(region) {
    console.log(region.id);
    if (confirm('Disabling a Region also disables all locations and sections within it. Are you sure to disable the ' +
    this.sharedService.scope[region.id].name + ' Region?')) {
      this.systemService.disableRegion(region.id)
      .subscribe(
      (results: any) => {
        if (results.region) {
          this.system.toastr.success('Successfully disabled ' + this.sharedService.scope[region.id].name + '.', 'Region disabled');
          // Pull new data
          this.sharedService.refreshPermissions();
        } else {
          for (const error of results.reason) {
            this.system.toastr.error(error.message, 'Server Error occured');
          }
        }
      });
    }
    console.log(this.sharedService.scope);
    console.log(this.sharedService.roles);
  }

  editRegion(region) {
    this.sharedService.regionSelected = region;
    this.router.navigate(['/administration/region']);
  }
*/
}
