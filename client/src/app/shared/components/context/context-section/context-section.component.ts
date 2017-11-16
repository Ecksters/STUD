import { SystemMessageService } from './../../../services/systemMessage.service';
import { SharedService, Role, Level } from './../../../services/shared.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'context-section',
  templateUrl: './context-section.component.html',
  styleUrls: ['./context-section.component.scss']
})
export class ContextSectionComponent {

  Array = Array;
  region;
  location;
  sectionSelected = '';
  sections = [];

  @Output() sectionChange = new EventEmitter<any>();

  selectPlaceholder = 'Select a Section';

  constructor(public sharedService: SharedService, public system: SystemMessageService) {
    if (sharedService.regionSelected && sharedService.locationSelected) {
      this.region = sharedService.regionSelected;
      this.location = sharedService.locationSelected;
      this.sectionSelected = sharedService.sectionSelected ? sharedService.sectionSelected : '';
      const sections = Object.keys(sharedService.scope[this.region][this.location]).filter(k => k in sharedService.roles[Level.Section]);
      // tslint:disable-next-line:forin
      for (const section in sections) {
        this.sections.push({
          name: sharedService.scope[this.region][this.location][sections[section]].name,
          id: sections[section]
        });
      }
      if (this.sections.length === 0) {
        this.selectPlaceholder = 'No Sections within Location';
      }
    } else if (!sharedService.locationSelected) {
      this.selectPlaceholder = 'Select a Location First';
    }
  }

  selectRefurb(selection) {

  }

  selectSection(section) {
    this.sharedService.sectionSelected = section;
    this.sectionChange.emit(section);
    this.system.toastr.success('Selected the "' +
    this.sharedService.scope[this.region][this.location][section]
    .name + '" Section', 'Changed Section Focus');
    if (this.sectionChange.observers.length === 0) {
      this.sharedService.refreshCurrentRoute();
    }
  }
}
