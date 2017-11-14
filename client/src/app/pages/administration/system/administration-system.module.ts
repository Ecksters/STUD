import { AdministrationModule } from './../administration.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SystemMessageService } from '../../../shared/services/systemMessage.service';
import { SystemService } from './../../../shared/services/system.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

import { AdministrationSystemComponent } from './administration-system.component';

const HOME_ROUTE = [
    { path: '', component: AdministrationSystemComponent }
];

@NgModule ({
    declarations: [
        AdministrationSystemComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AdministrationModule,
        AlertModule.forRoot(),
        RouterModule.forChild(HOME_ROUTE)
    ],
    providers: [
      SystemService,
      SystemMessageService
    ]
})

export class AdministrationSystemModule {  }
