import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-refurbs-verify',
    templateUrl: './refurbs-verify.component.html'
})
export class RefurbsVerifyComponent implements OnInit {

  refurb: any;

  constructor(public sharedService: SharedService) {

  }

  ngOnInit() {

  }

  selectRefurb(refurb) {
    this.refurb = refurb;
  }

}
