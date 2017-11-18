import { UsersService } from './../../../../shared/services/users.service';
import { SectionService } from './../../../../shared/services/section.service';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService, Role, Level } from './../../../../shared/services/shared.service';

import { Router } from '@angular/router';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html'
})
export class TeamListComponent {
  expandedRow: any;
  teams: any;
  Role = Role;
  Level = Level;

  @Input() userData: any;

  @ViewChild('teamList') table: any;

  constructor(public sharedService: SharedService, private usersService: UsersService,
     public system: SystemMessageService, private router: Router) {
  }

  memberNames(members) {
    const memberNames = members.map((member) => member.name);
    return memberNames.join(', ');
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row.selected[0]);
    this.table.rowDetail.toggleExpandRow(this.expandedRow);
    this.expandedRow = row.selected[0];
  }
}
