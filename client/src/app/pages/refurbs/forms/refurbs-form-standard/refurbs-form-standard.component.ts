import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { RefurbsService } from '../../../../shared/services/refurbs.service';
import { NgForm } from '@angular/forms/src/directives';
import { SharedService } from '../../../../shared/services/shared.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'refurbs-form-standard',
    templateUrl: './refurbs-form-standard.component.html',
    styleUrls: ['./refurbs-form-standard.component.scss']
})
export class RefurbsFormStandardComponent implements OnInit {
  loading = false;
  serverErrors = [];

  submitVerb = 'Create';
  mistakeDescriptionValue = '';
  mistakeStatus = '';

  @ViewChild('softwareCheck') softwareCheck: ElementRef;
  @ViewChild('verifyInfoCheck') verifyInfoCheck: ElementRef;
  @ViewChild('verifySoftwareCheck') verifySoftwareCheck: ElementRef;

  submitAsSelected = false;

  @Input() updating = false;

  @Input() refurb = {id: '', region: '', location: '',
  sectionSubmit: '', submitterSubmit: '', teamSubmit: '', sectionVerify: '', submitterVerify: '', teamVerify: '',
  formFactor: '', manufacturer: '', model: '', color: '', size: '', state: '',
  processor: '', ram: undefined, storage: undefined, storageType: '', os: '',
  edited: '', created: '', verified: '', donated: ''};

  constructor(public sharedService: SharedService, private refurbService: RefurbsService, private system: SystemMessageService) {}

  ngOnInit() {
    if (this.updating) {
      this.submitVerb = 'Update';
    } else if (this.refurb.id) {
      this.submitVerb = 'Verify';
      this.refurb.sectionVerify = this.sharedService.sectionSelected;
      this.refurb.submitterVerify = this.sharedService.user.id;
    } else {
      this.refurb.region = this.sharedService.regionSelected;
      this.refurb.location = this.sharedService.locationSelected;
      this.refurb.sectionSubmit = this.sharedService.sectionSelected;
      this.refurb.submitterSubmit = this.sharedService.user.id;
    }
  }

  confirmedInfo(): boolean {
    const softwareCheck = this.softwareCheck ? this.softwareCheck.nativeElement.checked : false;
    const verifySoftwareCheck = this.verifySoftwareCheck ? this.verifySoftwareCheck.nativeElement.checked : false;
    const verifyInfoCheck = this.verifyInfoCheck ? this.verifyInfoCheck.nativeElement.checked : false;
    return softwareCheck || (verifySoftwareCheck && verifyInfoCheck);
  }

  capitalize(value) {
    this.refurb[value] = this.sharedService.capitalize(this.refurb[value]);
  }

  updateSubmitAs(submitAs) {
    this.submitAsSelected = true;
    if (this.refurb.id) { //Verifying
      this.refurb.teamVerify = submitAs;
    } else { //Submitting
      this.refurb.teamSubmit = submitAs;
    }
  }

  submitRefurb(form: NgForm) {
    console.log(this.refurb);
    console.log(this.mistakeDescriptionValue);
    let endpoint = 'addRefurb';
    const parameters = [];
    parameters.push(this.refurb);
    if (this.updating) {
      endpoint = 'updateRefurb';
    } else if (this.refurb.id) {
      endpoint = 'verifyRefurb';
      parameters.push(this.mistakeDescriptionValue);
    }
    this.loading = true;
    this.refurbService[endpoint](...parameters).subscribe(
      (result) => {
        this.system.toastr.success('Submitted Refurb #' + result['id'] + ' Successfully.',
        this.submitVerb + ' Refurb Succeeded');
        this.sharedService.refreshCurrentRoute();
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
