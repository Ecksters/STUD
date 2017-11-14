import { RefurbsModule } from './../refurbs.module';
import { RefurbsService } from './../../../shared/services/refurbs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { RefurbsSubmitComponent } from './refurbs-submit.component';

const HOME_ROUTE = [
    { path: '', component: RefurbsSubmitComponent }
];

@NgModule ({
    declarations: [
      RefurbsSubmitComponent
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

export class RefurbsSubmitModule {  }
