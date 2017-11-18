import { FormsModule } from '@angular/forms';
import { SectionService } from './../../../shared/services/section.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TeamCreateComponent } from './team-create/team-create.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule ({
    declarations: [
        TeamCreateComponent,
        TeamListComponent
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
      TeamCreateComponent,
      TeamListComponent
    ]
})

export class TeamsModule {  }
