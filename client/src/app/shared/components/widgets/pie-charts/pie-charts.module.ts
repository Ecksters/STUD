import { SharedModule } from './../../../shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule ({
    imports: [
        CommonModule,
        SharedModule
    ]
})

export class PieChartsModule {}
