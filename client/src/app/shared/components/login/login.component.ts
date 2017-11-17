import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './../../services/shared.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public modalRef: BsModalRef;
    public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  @Input() public showButton = false;
  @ViewChild('loginModal') loginModal: ElementRef;

  public errorMsg = 'Please verify your info.';
  public loading = false;

  constructor(private modalService: BsModalService, private sharedService: SharedService, private router: Router) {}

  public openModal() {
    this.modalRef = this.modalService.show(this.loginModal, Object.assign({}, this.config, {class: 'gray modal-lg'}));
    this.loading = false;
    this.errorMsg = 'Please verify your info.';
  }

  public login(form: NgForm) {
    const value = form.value;
    this.loading = true;
    this.sharedService.userLogin(value.email, value.password)
    .finally(() => {
      this.loading = false;
    }).subscribe(
    (results: any) => {
      if (results.authenticated) {
        this.sharedService.initializeRoles(results);
        this.router.navigate(['/']);
        this.modalRef.hide();
      } else {
        this.errorMsg = results.reason;
        (<FormControl>form.controls.password).reset();
      }
    },
    (error) => {
      this.errorMsg = 'Login failed.';
    });
  }
}
