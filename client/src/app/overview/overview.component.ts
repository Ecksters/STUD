import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SharedService } from '../shared/services/shared.service';

@Component({
    selector: 'app-layout',
    templateUrl: './overview.component.html',
    styleUrls: [
      './overview.component.scss'
    ]
})
export class OverviewComponent implements OnInit {
    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
    }
}
