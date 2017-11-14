import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-refurbs-submit',
    templateUrl: './refurbs-submit.component.html'
})
export class RefurbsSubmitComponent implements OnInit {

    constructor(public sharedService: SharedService) {

    }

    ngOnInit() {

    }

}
