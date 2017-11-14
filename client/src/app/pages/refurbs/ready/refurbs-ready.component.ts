import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'refurbs-ready',
    templateUrl: './refurbs-ready.component.html'
})
export class RefurbsReadyComponent implements OnInit {

    constructor(public sharedService: SharedService) {

    }

    ngOnInit() {

    }

}
