import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { UsersComponent } from './users.component';

const HOME_ROUTE = [
    { path: '', component: UsersComponent }
];

@NgModule ({
    declarations: [
        UsersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(HOME_ROUTE)
    ]
})

export class UsersModule {  }
