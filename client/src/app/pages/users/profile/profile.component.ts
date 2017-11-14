import { UsersService } from './../../../shared/services/users.service';
import { SharedService } from './../../../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  id: number;
  user: any;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, public usersService: UsersService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.usersService.getUser(this.id).subscribe(
      (result) => {
        this.user = result;
      }
    );
  }

  updateUser() {
    this.usersService.getUser(this.id).subscribe(
      (result) => {
        this.user = result;
      }
    );
  }

}
