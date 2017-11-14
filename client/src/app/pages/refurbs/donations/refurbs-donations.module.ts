import { RefurbsService } from '../../../shared/services/refurbs.service';
import { RefurbsModule } from '../refurbs.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { RefurbsDonationsComponent } from './refurbs-donations.component';

const HOME_ROUTE = [
    { path: '', component: RefurbsDonationsComponent }
];

@NgModule ({
    declarations: [
      RefurbsDonationsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      SharedModule,
      RefurbsModule,
      RouterModule.forChild(HOME_ROUTE)
    ],
    providers: [
      RefurbsService
    ]
})

export class RefurbsDonationsModule {  }
