import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SharedService } from './../../services/shared.service';
import { ValidationErrors, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { Component, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'register-modal',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public modalRef: BsModalRef;
    public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  @Input() public showButton = false;
  @ViewChild('registerModal') registerModal: ElementRef;

  public loading = false;

  public errorMsg = 'Check the red fields.';

  constructor(private modalService: BsModalService, private sharedService: SharedService,
    private usersService: UsersService, private router: Router) {}

  public openModal() {
    this.modalRef = this.modalService.show(this.registerModal, Object.assign({}, this.config, {class: 'gray modal-lg'}));
  }

  public register(form: NgForm) {
    const value = form.value;
    this.loading = true;
    this.usersService.register(value.name, value.email, value.password, value.accessCode)
    .finally(() => {
      this.loading = false;
    })
    .subscribe(
    (results: any) => {
      if (results.authenticated) {
        this.sharedService.initializeRoles(results);
        this.router.navigate(['/']);
        this.modalRef.hide();
      } else {
        // tslint:disable-next-line:forin
        for (const error in results.errors) {
          this.errorMsg = results.errors[error].message;
          //(<FormControl>form.controls[results.errors[error].field]).reset();
        }
        this.errorMsg = results.errors[0].message;
      }
    },
    (error) => {
      this.errorMsg = 'Register failed.';
    });
  }
}
