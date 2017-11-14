import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common/src/directives/ng_class';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule, ModalBackdropComponent } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';

import { OverviewComponent } from './overview.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { RegisterComponent } from '../shared/components/register/register.component';

@NgModule ({
    declarations: [
        OverviewComponent,
        HeaderComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: OverviewComponent}
        ]),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        MomentModule,
        ModalModule.forRoot()
    ]
})
export class OverviewModule {  }
