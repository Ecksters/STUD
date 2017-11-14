import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-refurbs-donations',
    templateUrl: './refurbs-donations.component.html'
})
export class RefurbsDonationsComponent implements OnInit {

    constructor(public sharedService: SharedService) {

    }

    ngOnInit() {

    }

}
