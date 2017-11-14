import { LevelService } from './../../../../shared/services/level.service';
import { NgForm } from '@angular/forms/src/directives';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { UsersService } from '../../../../shared/services/users.service';
import { SharedService, Role, Level } from './../../../../shared/services/shared.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user-roles',
    templateUrl: './user-roles.component.html'
})

export class UserRolesComponent implements OnInit {
  @Input() userData: any;

  loading = false;
  serverErrors = [];
  LevelService = LevelService;


  constructor(public sharedService: SharedService, public usersService: UsersService, public system: SystemMessageService) {}

  ngOnInit() {

  }

  findContext(user) {
    if (user.role == Role.SystemAdmin) {
      return 'System-Wide';
    }
    if (user.role == Role.RegionAdmin) {
      return this.sharedService.scope[user.context].name + ' Region';
    }
    if (user.role >= Role.LocationMod) {
      return this.sharedService.searchForContext(user.context, this.userData.scope, 2) + ' Location';
    }
    if (user.role <= Role.SectionMod) {
      return this.sharedService.searchForContext(user.context, this.userData.scope, 3) + ' Section';
    }
  }

  updateUser(form: NgForm) {
    const value = form.value;

    const user = {
      name: value.updateUserName, email: value.updateUserEmail
    };

    this.loading = true;
    this.serverErrors = [];

    this.usersService.updateUser(user)
    .subscribe(
    (results: any) => {
      if (results.user) {
        this.system.toastr.success('Updated ' + user.name + ' Successfully.',
        'User Updated');
        this.sharedService.refreshCurrentRoute();
      } else {
        this.loading = false;
        for (const error of results.reason) {
          this.serverErrors.push(error.message);
        }
      }
    },
    (error) => {
      this.loading = false;
      this.serverErrors = ['Error occured, please try again.'];
    });
  }
}
