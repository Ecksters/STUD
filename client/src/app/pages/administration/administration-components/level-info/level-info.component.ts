import { SharedAdministration } from '../shared-administration.class';
import { NgForm } from '@angular/forms/src/directives';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService, Level, Role } from './../../../../shared/services/shared.service';
import { LevelService } from './../../../../shared/services/level.service';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'level-info',
  templateUrl: './level-info.component.html'
})
export class LevelInfoComponent implements OnInit {
  loading = false;
  serverErrors = [];
  admin: boolean;

  @Input() context: SharedAdministration;

  constructor(public sharedService: SharedService, public system: SystemMessageService) {}

  ngOnInit() {
    this.admin = this.sharedService.checkPermissions(this.context.levelId,
      this.context.levelName === 'section' ? Role['LocationAdmin'] : Role[this.context.levelProperName + 'Admin'] + 1,
      Level[this.context.levelProperName]);
  }

  updateLevel(form: NgForm) {
    const value = form.value;

    const level = {
      name: value.updateLevelName, code: value.updateLevelAccessCode,
      expirationDate: value.updateLevelAccessCodeExpiration,
      uses: value.updateLevelAccessCodeUses
    };

    this.loading = true;
    this.serverErrors = [];

    this.context.levelService.updateLevel(level)
    .subscribe(
    (results: any) => {
      if (results.level) {
        this.system.toastr.success('Changed ' + this.context.levelProperName + ' Successfully.',
        this.context.levelProperName + ' Updated');
        this.sharedService.refreshPermissions();
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
