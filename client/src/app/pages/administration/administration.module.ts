import { RouterModule } from '@angular/router';
import { LevelTeamListComponent } from './administration-components/level-team-list/level-team-list.component';
import { UsersListComponent } from '../users/list/users-list.component';
import { MomentModule } from 'angular2-moment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { LevelCreateChildComponent } from './administration-components/level-create-child/level-create-child.component';
import { LevelListChildrenComponent } from './administration-components/level-list-children/level-list-children.component';
import { LevelInfoComponent } from './administration-components/level-info/level-info.component';

import { BsDatepickerModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionService } from '../../shared/services/section.service';

@NgModule ({
    declarations: [
        UsersListComponent,
        LevelInfoComponent,
        LevelListChildrenComponent,
        LevelCreateChildComponent,
        LevelTeamListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        RouterModule,
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        MomentModule
    ],
    exports: [
      UsersListComponent,
      LevelInfoComponent,
      LevelListChildrenComponent,
      LevelCreateChildComponent,
      LevelTeamListComponent
    ],
    providers: [
      SectionService
    ]
})
export class AdministrationModule {  }
