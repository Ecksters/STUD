import { RegisterComponent } from './../../shared/components/register/register.component';
import { LoginComponent } from '../../shared/components/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    @ViewChild(LoginComponent) loginModal: LoginComponent;

    constructor(private sharedService: SharedService) {}

    public openLogin() {
        this.loginModal.openModal();
    }

    ngOnInit() {

    }
}
