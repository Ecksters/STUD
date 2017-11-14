import { AdministrationModule } from '../administration.module';
import { RouterModule } from '@angular/router';
import { RegionService } from './../../../shared/services/region.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { AdministrationRegionComponent } from './administration-region.component';

const HOME_ROUTE = [
    { path: '', component: AdministrationRegionComponent }
];

@NgModule ({
    declarations: [
        AdministrationRegionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(HOME_ROUTE),
        AdministrationModule
    ],
    providers: [
      RegionService
    ]
})

export class AdministrationRegionModule {  }
