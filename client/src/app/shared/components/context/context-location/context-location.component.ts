import { SystemMessageService } from './../../../services/systemMessage.service';
import { SharedService, Role, Level } from './../../../services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'context-location',
  templateUrl: './context-location.component.html',
  styleUrls: ['./context-location.component.scss']
})
export class ContextLocationComponent {

  locationOptions = [];

  constructor(public sharedService: SharedService, public system: SystemMessageService) {
    const role = Role;
    const level = Level;
    // tslint:disable-next-line:forin
    for (const region in sharedService.roles[level.Region]) {
      console.log("Region", region)
      const regionLocations = [];
      const locations = Object.keys(sharedService.scope[region]).filter(k => k in sharedService.roles[level.Location]);
      console.log("Locations:", locations);
      // tslint:disable-next-line:forin
      for (const location in locations) {
        regionLocations.push({
          name: sharedService.scope[region][locations[location]].name,
          id: locations[location]
        });
      }
      this.locationOptions.push({name: sharedService.scope[region].name, id: region, locations: regionLocations});
    }
    console.log(this.locationOptions);
  }

  selectRegion(region) {
    if (this.sharedService.regionCount > 1) {
      this.sharedService.regionSelected = region;
      if (Object.keys(this.sharedService.scope[region]).length === 2) { //Name and only 1 location, select the only location too
        this.selectLocation(Object.keys(this.sharedService.scope[region])
        .filter(k => k in this.sharedService.roles[Level.Location])[0], region);
        return;
      } else {
        this.sharedService.locationSelected = undefined;
      }
      this.sharedService.sectionSelected = undefined;
      this.sharedService.refreshCurrentRoute();
      this.system.toastr.success('Now focusing on "' + this.sharedService.scope[region].name +
      '" Region.', 'Changed Region Focus');
    }
  }

  selectLocation(location, region) {
    this.sharedService.regionSelected = region;
    this.sharedService.locationSelected = location;
    if (Object.keys(this.sharedService.scope[region][location]).length === 2) { //Name and only 1 section, select the only section too
      this.sharedService.sectionSelected = Object.keys(this.sharedService.scope[region][location])
      .filter(k => k in this.sharedService.roles[Level.Section])[0];
    } else {
      this.sharedService.sectionSelected = undefined;
    }
    console.log(location, region);
    this.system.toastr.success('Now focusing on the "' + this.sharedService.scope[region][location].name +
    '" Location in the "' + this.sharedService.scope[region].name +
    '" Region.', 'Changed Location Focus');
    this.sharedService.refreshCurrentRoute();
  }
}
