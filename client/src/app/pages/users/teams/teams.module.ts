import { FormsModule } from '@angular/forms';
import { SectionService } from './../../../shared/services/section.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TeamCreateComponent } from './team-create/team-create.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule ({
    declarations: [
        TeamCreateComponent
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        SharedModule,
        FormsModule
    ],
    providers: [
      SectionService
    ],
    exports: [
      TeamCreateComponent
    ]
})

export class TeamsModule {  }
