import { SectionService } from './../../../../shared/services/section.service';
import { SharedAdministration } from './../shared-administration.class';
import { LevelService } from './../../../../shared/services/level.service';
import { SystemMessageService } from './../../../../shared/services/systemMessage.service';
import { SharedService, Role, Level } from './../../../../shared/services/shared.service';

import { Router } from '@angular/router';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'level-team-list',
  templateUrl: './level-team-list.component.html'
})
export class LevelTeamListComponent {
  teams: any;
  pending: any;
  selectedPending = [];
  selectedActive = [];
  Role = Role;
  Level = Level;
  LevelService = LevelService;

  @Input() context: SharedAdministration;

  constructor(public sharedService: SharedService, public system: SystemMessageService, private router: Router,
              public sectionService: SectionService) {
    this.initialize();
  }

  acceptTeams(row) {
    const teams = row ? [row] : this.selectedPending;
    const contexts = teams.map((team) => team.section);
    const teamIds = teams.map((team) => team.id);
    this.sectionService.acceptTeams(teamIds, contexts).subscribe(
      (results) => {
        // tslint:disable-next-line:forin
        for (const team in teams) {
          const index = this.pending.indexOf(teams[team]);
          this.pending.splice(index, 1);
          this.teams = [teams[team], ...this.teams];
        }
        this.selectedPending = [];
        this.system.toastr.success('Successfully accepted Team(s).', 'Team(s) Accepted');
      }
    );
  }

  rejectTeams(row) {
    const teams = row ? [row] : this.selectedPending;
    const contexts = teams.map((team) => team.section);
    const teamIds = teams.map((team) => team.id);
    this.sectionService.rejectTeams(teamIds, contexts).subscribe(
      (results) => {
        // tslint:disable-next-line:forin
        for (const team in teams) {
          const index = this.pending.indexOf(teams[team]);
          this.pending.splice(index, 1);
          this.pending = [...this.pending];
        }
        this.selectedPending = [];
        this.system.toastr.success('Successfully Rejected Team(s).', 'Team(s) Rejected');
      }
    );
  }

  retireTeams(row) {
    const teams = row ? [row] : this.selectedActive;
    const contexts = teams.map((team) => team.section);
    const teamIds = teams.map((team) => team.id);
    if (confirm('Are you sure you want to retire the team(s)? This cannot be undone.')) {
      this.sectionService.retireTeams(teamIds, contexts).subscribe(
        (results) => {
          // tslint:disable-next-line:forin
          for (const team in teams) {
            const index = this.teams.indexOf(teams[team]);
            this.teams.splice(index, 1);
            this.teams = [...this.teams];
          }
          this.selectedActive = [];
          this.system.toastr.success('Successfully retired Team(s).', 'Team(s) Retired');
        }
      );
    }
  }



  initialize() {
    if (this.context && this.context.teams) {
      this.teams = this.context.teams.filter((team) => team.approved === '1');
      this.pending = this.context.teams.filter((team) => team.approved === '0');
    } else {
      setTimeout(this.initialize.bind(this), 50);
    }
  }

  memberNames(members) {
    const memberNames = members.map((member) => member.name);
    return memberNames.join(', ');
  }
}
