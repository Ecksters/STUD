import { NgForm } from '@angular/forms/src/directives';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { UsersService } from '../../../../shared/services/users.service';
import { SharedService, Role, Level } from './../../../../shared/services/shared.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html'
})

export class UserSettingsComponent implements OnInit {
  @Input() userData: any;

  loading = false;
  serverErrors = [];
  admin: boolean;

  constructor(public sharedService: SharedService, public usersService: UsersService, public system: SystemMessageService) {
    this.admin = this.sharedService.roles[Level.System] >= Role.LocationAdmin;
  }

  ngOnInit() {

  }

  updateUser(form: NgForm) {
    const value = form.value;

    const user = {
      id: this.userData.user.id, name: value.updateUserName, email: value.updateUserEmail,
      oldPassword: value.updateUserPasswordOld || '', newPassword: value.updateUserPasswordNew
    };

    this.loading = true;
    this.serverErrors = [];

    this.usersService.updateUser(user)
    .subscribe(
    (results: any) => {
      if (results.user) {
        this.system.toastr.success('Updated ' + results.user.name + ' Successfully.',
        'User Updated');
        this.sharedService.refreshPermissions();
      } else {
        this.loading = false;
        this.serverErrors.push(results.reason || 'Error occured, please try again.');
      }
    },
    (error) => {
      this.loading = false;
      this.serverErrors = ['Error occured, please try again.'];
    });
  }
}
