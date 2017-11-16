import { TeamsModule } from './../teams/teams.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserRolesComponent } from './../user-components/user-roles/user-roles.component';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { UserSettingsComponent } from '../user-components/user-settings/user-settings.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { ProfileComponent } from "./profile.component";

const HOME_ROUTE = [
    { path: '', component: ProfileComponent }
];

@NgModule ({
    declarations: [
        ProfileComponent,
        UserSettingsComponent,
        UserRolesComponent
    ],
    imports: [
        CommonModule,
        MomentModule,
        NgxDatatableModule,
        SharedModule,
        FormsModule,
        TeamsModule,
        RouterModule.forChild(HOME_ROUTE)
    ]
})

export class ProfileModule {  }
