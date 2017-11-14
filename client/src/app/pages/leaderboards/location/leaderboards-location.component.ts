import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'leaderboards-location',
    templateUrl: './leaderboards-location.component.html'
})
export class LeaderboardsLocationComponent implements OnInit {

    constructor(public sharedService: SharedService) {

    }

    ngOnInit() {

    }

}
