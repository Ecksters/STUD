import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewContainerRef, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
    // Sidebar visibility
    sidebarVisible: boolean;
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>();

    // Theming
    maTheme: string;
    maThemeSubject: Subject<string> = new Subject<string>();

    authenticated = false;
    stayLoggedIn = false;

    vcRef: ViewContainerRef;

    user = { id: '', name: 'Guest', email: ''};
    roles = [];
    scope = [];
    regionCount = 0;
    locationCount = 0;
    sectionCount = 0;

    regionSelected: string;
    locationSelected: string;
    sectionSelected: string;

    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible;
        this.sidebarVisibilitySubject.next(this.sidebarVisible);
    }

    constructor(private httpClient: HttpClient, private router: Router, private injector: Injector) {
        // Hidden the sidebar by default
        this.sidebarVisible = false;
        this.maTheme = 'blue-grey';
    }

    searchForContext(context, scope, depth) {
      // Depth of 1 = Region, 2 = Location, 3 = Section (Recursive, however)
      if (depth === 1 && scope[context]) {
        return scope[context].name;
      }
      const keys = Object.keys(scope);
      for (let i = 0; i < keys.length; i++) {
        if (typeof scope[keys[i]] === 'object' && depth > 1) {
          const lowerCheck = this.searchForContext(context, scope[keys[i]], depth - 1);
          if (lowerCheck !== -1) {
            return lowerCheck;
          }
        }
      }
      return -1;
    }

    refreshCurrentRoute() {
      this.router.navigate([this.router.url]);
    }

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    objectLength(obj) {
      let length = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          length++;
        }
      }
      return length;
    }

    isNumeric(value: any): boolean {
      return !isNaN(value - parseFloat(value));
    }

    userLogin(email: String, password: String) {
        const body = { email: email, password: password };
        return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/login', body);
    }

    refreshPermissions() {
      this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/getPermissions', {})
      .subscribe(
        (results: Array<any>) => {
          this.initializeRoles(results);
          this.refreshCurrentRoute();
        }
      );
    }

    initializeRoles(results: Array<any>) {
      console.log(results['user'].scope);
      this.authenticated = results['authenticated'];
      this.user = { id: results['user'].id, name: results['user'].name, email: results['user'].email };
      this.roles = results['user'].roles;
      this.scope = results['user'].scope;

      this.regionCount = Object.keys(this.roles[Level.Region]).length;
      this.locationCount = (this.roles[Level.Location] && Object.keys(this.roles[Level.Location]).length) || 0;
      this.sectionCount = (this.roles[Level.Section] && Object.keys(this.roles[Level.Section]).length) || 0;

      if (this.regionCount === 1) {
        this.regionSelected = Object.keys(this.roles[Level.Region])[0];
        if (this.locationCount === 1) {
          this.locationSelected = Object.keys(this.roles[Level.Location])[0];
          if (this.sectionCount === 1) {
            this.sectionSelected = Object.keys(this.roles[Level.Section])[0];
          }
        }
      }

      console.log(this.regionCount, this.locationCount, this.sectionCount);
      console.log(this.regionSelected, this.locationSelected, this.sectionSelected);
    }

    public checkPermissions(context: number, minRole: Role = Role.RestrictedUser, level: Level = Level.Section): boolean {
      // console.log("MinRole:", minRole, "Context:", context, "Level:", level);
      return (this.roles[level][context] >= minRole);
    }
}

export enum Role {
  Guest,
  RestrictedUser,
  User,
  SectionMod,
  LocationMod,
  LocationAdmin,
  RegionAdmin,
  SystemAdmin
}

export enum Level {
  Public,
  Section,
  Location,
  Region,
  System
}
