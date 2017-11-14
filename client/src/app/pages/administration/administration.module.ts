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

@NgModule ({
    declarations: [
        UsersListComponent,
        LevelInfoComponent,
        LevelListChildrenComponent,
        LevelCreateChildComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        MomentModule
    ],
    exports: [
      UsersListComponent,
      LevelInfoComponent,
      LevelListChildrenComponent,
      LevelCreateChildComponent
    ]
})
export class AdministrationModule {  }
