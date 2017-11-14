import { Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared/services/shared.service';
import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoad, Router, Route } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private sharedService: SharedService, private httpClient: HttpClient) {}

  canLoad(route: Route) {
    if (this.sharedService.authenticated) {
      return true;
    }
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/checkLogin', '').map(
        (results: any) => {
          this.sharedService.initializeRoles(results);
          if (!results.authenticated) {
            this.router.navigate(['/overview']);
          } else {
            this.sharedService.stayLoggedIn = true;
          }
          return results.authenticated;
        }
    ).catch(() => {
      this.router.navigate(['/overview']);
      return Observable.of(false);
    });
  }
}
