import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { RefurbsService } from '../../../../shared/services/refurbs.service';
import { NgForm } from '@angular/forms/src/directives';
import { SharedService, Level, Role } from '../../../../shared/services/shared.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'refurbs-list',
    templateUrl: './refurbs-list.component.html',
    styleUrls: ['./refurbs-list.component.scss']
})
export class RefurbsListComponent implements OnInit {

  title = 'Unverified';
  refurbs: any;

  selectionType = 'single';

  checkable = false;

  formFactors = {allinone: 'All-in-One', desktop: 'Desktop', laptop: 'Laptop'};

  tableView = 'appearance';

  @Input() status: string;

  @Output() refurbSelected = new EventEmitter<any>();
  selected = [];

  constructor(public sharedService: SharedService, private refurbService: RefurbsService, private system: SystemMessageService) {}

  ngOnInit() {
    if (this.status === 'verified') {
      this.checkable = this.sharedService.roles[Level.Location][this.sharedService.locationSelected] >= Role.LocationAdmin;
      this.selectionType = this.checkable ? 'checkbox' : undefined;
    }

    this.title = this.sharedService.capitalize(this.status);
    this.refurbService.getRefurbs(this.status).subscribe((refurbs: Array<any>) => {
      this.refurbs = refurbs;
    },
    (error) => {
      console.log(error);
    });
  }

  selectRefurb(selection) {
    this.refurbSelected.emit(selection.selected[0]);
  }

  donateSelected() {
    const refurbIds = this.selected.map((refurb) => {
      return refurb.id;
    });
    this.refurbService.donateRefurbs(refurbIds).subscribe(
      (results) => {
        this.system.toastr.success('Refurbs ' + refurbIds.join(', ') + ' marked as donated successfully.',
        'Donated Refurbs Successfully');
        this.sharedService.refreshCurrentRoute();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTable(newView) {
    this.tableView = newView;
    this.refurbs = [...this.refurbs];
  }
}
