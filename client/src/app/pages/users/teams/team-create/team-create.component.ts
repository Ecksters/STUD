import { SectionService } from './../../../../shared/services/section.service';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService, Level, Role } from './../../../../shared/services/shared.service';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';

import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'team-create',
  templateUrl: './team-create.component.html'
})
export class TeamCreateComponent implements OnChanges {
  selected = [];
  rows: any;
  users = [];

  submitting = false;
  serverErrors = [];

  @Input() userData: any;

  sectionSelected = '';
  newTeamName = '';
  sections = [];

  constructor(public sharedService: SharedService, public system: SystemMessageService, private router: Router,
    private sectionService: SectionService, private cd: ChangeDetectorRef) {
  }

  ngOnChanges() {
    if (this.userData) {
      const sectionKeys = Object.keys(this.userData.roles[Level.Section]);
      console.log(sectionKeys);
      // tslint:disable-next-line:forin
      for (const section in sectionKeys) {
        this.sections.push({ id: sectionKeys[section],
          name: this.sharedService.searchForContext(sectionKeys[section], this.userData.scope, 3) });
      }
      if (this.sections.length === 1) {
        this.sectionSelected = this.sections[0].id;
        this.selectSection(this.sectionSelected);
      }
    }
    this.cd.detectChanges();
  }

  selectSection(newSection) {
    this.sectionSelected = newSection;
    if (this.sectionSelected) {
      this.users = undefined;
      this.sectionService.getUsers(this.sectionSelected).subscribe((results: Array<any>) => {
        console.log(this.userData.user.id);
        this.users = results.filter((user) => user.user != this.userData.user.id);
      });
    }
  }

  createTeam() {
    if (!(this.newTeamName.length > 3 && this.selected.length > 0 && this.sectionSelected)) {
      this.serverErrors = ['Invalid form, double check the options'];
      return;
    }
    this.submitting = true;
    this.serverErrors = [];
    const teamUsers = this.selected.map((user) => user.user);
    teamUsers.push(this.userData.user.id);
    this.sectionService.createTeam(this.newTeamName, teamUsers, this.sectionSelected)
    .subscribe(
    (results: any) => {
      if (results.result) {
        this.system.toastr.success('Created team "' + this.newTeamName +
        '" Successfully.', 'New Team Created', {data: {url: '/'}});
        this.sharedService.refreshPermissions();
      } else {
        for (const error of results.reason) {
          this.serverErrors.push(error.message);
        }
        this.submitting = false;
      }
    },
    (error) => {
      this.submitting = false;
      this.serverErrors = ['Error occured, please try again.'];
    });

  }
}
