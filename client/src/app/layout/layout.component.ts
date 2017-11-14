import { RunResults } from 'protractor/built/taskRunner';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SharedService } from '../shared/services/shared.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    maTheme: string = this.sharedService.maTheme;

    constructor(private sharedService: SharedService) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maTheme = value;
        });
    }

    ngOnInit() {
    }
}
