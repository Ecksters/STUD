import { FormsModule } from '@angular/forms';
import { SectionService } from './../../../shared/services/section.service';
import { AdministrationModule } from './../administration.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { AdministrationSectionComponent } from './administration-section.component';

const HOME_ROUTE = [
    { path: '', component: AdministrationSectionComponent }
];

@NgModule ({
    declarations: [
        AdministrationSectionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AdministrationModule,
        RouterModule.forChild(HOME_ROUTE)
    ]
})

export class AdministrationSectionModule {  }
