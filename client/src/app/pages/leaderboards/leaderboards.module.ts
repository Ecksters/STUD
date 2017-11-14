import { MomentModule } from 'angular2-moment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule ({
    declarations: [
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        FormsModule
    ],
    exports: [
    ]
})
export class LeaderboardsModule {  }
