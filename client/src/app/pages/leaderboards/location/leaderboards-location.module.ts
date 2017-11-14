import { LeaderboardsLocationComponent } from './leaderboards-location.component';
import { LeaderboardsModule } from './../leaderboards.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const HOME_ROUTE = [
    { path: '', component: LeaderboardsLocationComponent }
];

@NgModule ({
    declarations: [
      LeaderboardsLocationComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      LeaderboardsModule,
      RouterModule.forChild(HOME_ROUTE)
    ],
    providers: []
})

export class LeaderboardsLocationModule {  }
