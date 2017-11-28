import { ContextTeamComponent } from './../../shared/components/context/context-team/context-team.component';
import { RefurbsFormStandardComponent } from './forms/refurbs-form-standard/refurbs-form-standard.component';
import { RefurbsListComponent } from './list/refurbs-list/refurbs-list.component';
import { MomentModule } from 'angular2-moment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule ({
    declarations: [
      RefurbsListComponent,
      RefurbsFormStandardComponent,
      ContextTeamComponent
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        FormsModule
    ],
    exports: [
      RefurbsListComponent,
      RefurbsFormStandardComponent,
      ContextTeamComponent
    ]
})
export class RefurbsModule {  }
