import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { LevelService } from './level.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SectionService extends LevelService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {
    super('section', httpClient, sharedService);
  }

  createTeam(name: string, users: Array<any>, context: any) {
    const body = { name: name, users: users, context: [context] };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/section/createTeam', body);
  }
}
