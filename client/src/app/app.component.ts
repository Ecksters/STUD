import { SharedService } from './shared/services/shared.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private sharedService: SharedService, private router: Router, viewContainerRef: ViewContainerRef) {
        sharedService.vcRef = viewContainerRef;
    }

    ngOnInit() {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      };

      this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
              this.router.navigated = false;
              // window.scrollTo(0, 0);
          }
      });
    }

}
