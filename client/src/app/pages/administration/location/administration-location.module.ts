import { AdministrationModule } from './../administration.module';
import { LocationService } from './../../../shared/services/location.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { AdministrationLocationComponent } from './administration-location.component';

const HOME_ROUTE = [
    { path: '', component: AdministrationLocationComponent }
];

@NgModule ({
    declarations: [
        AdministrationLocationComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(HOME_ROUTE),
      AdministrationModule
    ],
    providers: [
      LocationService
    ]
})

export class AdministrationLocationModule {  }
