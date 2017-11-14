import { NgForm } from '@angular/forms/src/directives';
import { SharedAdministration } from './../shared-administration.class';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { LevelService } from './../../../../shared/services/level.service';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'level-create-child',
  templateUrl: './level-create-child.component.html'
})
export class LevelCreateChildComponent implements OnInit {
  loading = false;
  serverErrors = [];
  accessCode: string;
  @Input() context: SharedAdministration;

  defaultUseLimit: number;

  constructor(public sharedService: SharedService, public system: SystemMessageService) {
    this.accessCode = system.randomWord(8);
  }

  ngOnInit() {
    this.defaultUseLimit = this.context.childName === 'section' ? 40 : 1;
  }

  createChild(form: NgForm) {
    const value = form.value;
    this.loading = true;
    this.serverErrors = [];
    this.context.levelService.createChild(value.newChildName, value.newChildAccessCode,
      value.newChildAccessCodeUses || this.defaultUseLimit, value.newChildAccessCodeExpiration)
    .subscribe(
    (results: any) => {
      if (results.level) {
        this.system.toastr.success('Created "' + value.newChildName +
        '" ' + this.context.childProperName + ' Successfully.', 'New ' + this.context.childProperName + ' Created', {data: {url: '/'}});
        this.sharedService.refreshPermissions();
      } else {
        for (const error of results.reason) {
          this.serverErrors.push(error.message);
        }
        this.loading = false;
      }
    },
    (error) => {
      this.loading = false;
      this.serverErrors = ['Error occured, please try again.'];
    });

  }
}
