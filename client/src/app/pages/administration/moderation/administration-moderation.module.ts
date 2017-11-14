import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { AdministrationModerationComponent } from './administration-moderation.component';

const HOME_ROUTE = [
    { path: '', component: AdministrationModerationComponent }
];

@NgModule ({
    declarations: [
        AdministrationModerationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(HOME_ROUTE)
    ]
})

export class AdministrationModerationModule {  }
