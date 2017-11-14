import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { LevelService } from './../../../shared/services/level.service';
import { SystemMessageService } from './../../../shared/services/systemMessage.service';
import { SharedService, Role, Level } from './../../../shared/services/shared.service';


import { Router } from '@angular/router';
import { Component, Injector, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  selected = [];
  rows: any;
  users: any;
  grouping = 'section';
  Role = Role;
  Level = Level;
  LevelService = LevelService;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('searchType') searchType: ElementRef;
  @ViewChild('searchValue') searchValue: ElementRef;

  @Input() levelService: LevelService;

  constructor(public sharedService: SharedService, public system: SystemMessageService, private router: Router) {
  }

  ngOnInit() {
    this.levelService.getUsers().subscribe((results: Array<any>) => {
      this.users = results;
      this.rows = this.users;
    });
  }

  updateFilter() {
    const searchValue = this.searchValue.nativeElement.value.toLowerCase();
    const searchType = this.searchType.nativeElement.value.toLowerCase();
    this.rows = this.users.filter(function(user) {
      if (searchType === 'name') {
        return user[searchType].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      } else if (searchType === 'role') {
        return LevelService.roles[user[searchType]].toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      } else if (searchType === 'location') {
        return this.sharedService.scope[user.region][user.location].name.toLowerCase().indexOf(searchValue) !== -1 || !searchValue;
      } else if (searchType === 'section') {
        return user.section ? this.sharedService.scope[user.region][user.location][user.section].name
        .toLowerCase().indexOf(searchValue) !== -1 || !searchValue : false;
      }
    }.bind(this));
    this.table.offset = 0;
  }

  disableUser() {
    /*this.levelService.disableChild(contexts)
    .subscribe(
    (results: any) => {
      if (results.levels) {
        this.system.toastr.success('Successfully disabled ' + this.context.childProperName + 's.',
        this.context.childProperName + 's Disabled');
        // Pull new data
        this.sharedService.refreshPermissions();
      } else {
        for (const error of results.reason) {
          this.system.toastr.error(error.message, 'Server Error occured');
        }
      }
    });*/
  }

  editChild(child) {
    this.router.navigate(['/users/profile/' + child]);
  }
}
