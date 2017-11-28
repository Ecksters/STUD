import { SharedService, Role, Level } from './../../../services/shared.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'context-team',
  templateUrl: './context-team.component.html'
})
export class ContextTeamComponent implements OnInit {
  Array = Array;
  submitAsSelected = '';
  teams = [];

  @Output() submitAsChange = new EventEmitter<any>();

  constructor(public sharedService: SharedService) {
    this.teams = sharedService.teams.reduce((teams, team) => {
      if (team.section.id == sharedService.sectionSelected && team.approved === '1') {
        const members = team.members.reduce((memberList, member) => {
          memberList.push(member.name);
          return memberList;
        }, []);
        teams.push({id: team.id, name: team.name, members: members.join(', ')});
      }
      return teams;
    }, []);
  }
  ngOnInit() {
    if (this.teams.length === 0) {
      this.selectTeam(this.submitAsSelected);
      this.submitAsSelected = '0';
    }
  }

  selectTeam(submitAs) {
    this.submitAsChange.emit(submitAs === '0' ? '' : submitAs);
  }
}
