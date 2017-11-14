import { SectionService } from './../../../shared/services/section.service';
import { SharedService } from './../../../shared/services/shared.service';
import { SharedAdministration } from './../administration-components/shared-administration.class';
import { Component } from '@angular/core';

@Component({
    selector: 'app-administration-section',
    templateUrl: './administration-section.component.html'
})
export class AdministrationSectionComponent {

  context: SharedAdministration;
  constructor(public sharedService: SharedService, public sectionService: SectionService) {
    this.context = new SharedAdministration(sectionService, sharedService);
  }

}
