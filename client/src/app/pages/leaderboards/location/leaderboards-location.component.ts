import { StatsByLocationService } from './../../../shared/services/statsByLocation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'leaderboards-location',
    templateUrl: './leaderboards-location.component.html'
})
export class LeaderboardsLocationComponent implements OnInit {

    submitLeaders = [];
    verifyLeaders = [];

    constructor(public sharedService: SharedService, public stats: StatsByLocationService) {

    }

    ngOnInit() {
      this.stats.getStats().subscribe(
      (results: any) => {
        this.submitLeaders = results.submitLeaders;
        this.verifyLeaders = results.verifyLeaders;
      });
    }

}
