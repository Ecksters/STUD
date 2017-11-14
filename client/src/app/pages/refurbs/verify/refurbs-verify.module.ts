import { SharedModule } from './../../../shared/shared.module';
import { RefurbsModule } from './../refurbs.module';
import { RefurbsService } from './../../../shared/services/refurbs.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RefurbsVerifyComponent } from './refurbs-verify.component';

const HOME_ROUTE = [
    { path: '', component: RefurbsVerifyComponent }
];

@NgModule ({
    declarations: [
      RefurbsVerifyComponent
    ],
    imports: [
      CommonModule,
      RefurbsModule,
      SharedModule,
      RouterModule.forChild(HOME_ROUTE)
    ],
    providers: [
      RefurbsService
    ]
})

export class RefurbsVerifyModule {  }
