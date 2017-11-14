import { SharedService } from './../../../shared/services/shared.service';
import { RefurbsModule } from './../refurbs.module';
import { RefurbsService } from './../../../shared/services/refurbs.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { RefurbsReadyComponent } from './refurbs-ready.component';

const HOME_ROUTE = [
    { path: '', component: RefurbsReadyComponent }
];

@NgModule ({
    declarations: [
      RefurbsReadyComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RefurbsModule,
      RouterModule.forChild(HOME_ROUTE)
    ],
    providers: [
      RefurbsService
    ]
})

export class RefurbsReadyModule {  }
