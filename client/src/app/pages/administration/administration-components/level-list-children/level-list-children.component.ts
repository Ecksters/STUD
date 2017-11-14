import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService } from './../../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { SharedAdministration } from './../shared-administration.class';
import { LevelService } from './../../../../shared/services/level.service';
import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'level-list-children',
  templateUrl: './level-list-children.component.html'
})
export class LevelListChildrenComponent implements OnInit {
  loading = false;
  serverErrors = [];
  selected = [];

  Object = Object;

  grandchildDescription = undefined;

  @Input() context: SharedAdministration;

  constructor(public sharedService: SharedService, public system: SystemMessageService, private router: Router) {
  }

  ngOnInit() {
    if (this.context.levelService.levelIndex > 1) { // Regions and above
      this.grandchildDescription = this.sharedService.capitalize(LevelService.levels[this.context.levelService.levelIndex - 2]);
    }
  }

  disableSelectedChildren() {

    if (confirm('Are you sure to disable the selected '
    + this.context.childProperName + 's? (There are currently ' + this.selected.length + ' selected)')) {
      const contexts = [];
      for (let child = 0; child < this.selected.length; child++) {
        contexts.push(this.selected[child].id);
      }
      this.context.levelService.disableChild(contexts)
      .subscribe(
      (results: any) => {
        if (results.levels) {
          this.system.toastr.success('Successfully disabled ' + this.context.childProperName + 's.',
          this.context.childProperName + 's Disabled');
          // Pull new data
          this.sharedService.refreshPermissions();
        } else {
          for (const error of results.reason) {
            this.system.toastr.error(error.message, 'Server Error occured');
          }
        }
      });
    }
  }

  disableChild(child) {
    if (confirm('Are you sure to disable the ' + child.name + ' ' + this.context.childProperName + '?')) {
      this.context.levelService.disableChild([child.id])
      .subscribe(
      (results: any) => {
        if (results.levels) {
          this.system.toastr.success('Successfully disabled "' + child.name + '" ' + this.context.childProperName + '.',
          this.context.childProperName + ' Disabled');
          // Pull new data
          this.sharedService.refreshPermissions();
        } else {
          for (const error of results.reason) {
            this.system.toastr.error(error.message, 'Server Error occured');
          }
        }
      });
    }
  }

  editChild(child) {
    this.sharedService[this.context.childName + 'Selected'] = child;
    this.router.navigate(['/administration/' + this.context.childName]);
  }

  hasExpired(date) {
    if (date === null) {
      return false;
    }
    return new Date() > new Date(date);
  }

  childCountComparator(propA, propB, rowA, rowB) {
    if (this.sharedService.objectLength(rowA) < this.sharedService.objectLength(rowB)) {
      return -1;
    }
    if (this.sharedService.objectLength(rowA) > this.sharedService.objectLength(rowB)) {
      return 1;
    }
  }
}
