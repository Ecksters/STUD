import { HttpClient } from '@angular/common/http';
import { Level, SharedService } from './shared.service';

export class LevelService {
  public static levels = ['section', 'location', 'region', 'system'];
  public static roles = ['Guest', 'Restricted User', 'User', 'Section Mod',
  'Location Mod', 'Location Admin', 'Region Admin', 'System Admin'];
  childLevel: string;
  parentLevel: string;

  levelId: string;
  parentId: string;

  levelIndex: number;

  constructor(public level: string, public httpClient: HttpClient, public sharedService: SharedService) {
    this.levelIndex = LevelService.levels.indexOf(level);
    if (this.levelIndex !== 3) { // Region and below
      this.parentLevel = LevelService.levels[this.levelIndex + 1];
    }
    if (this.levelIndex !== 0) { // Location and above
      this.childLevel = LevelService.levels[this.levelIndex - 1];
    }
  }

  updateLevel(levelData, level = this.level, context = [this.levelId]) {
    const body = { level: levelData, context};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/' + level + '/update', body);
  }

  createChild(name: string, accessCode: string, uses: number, expirationDate: string) {
    const body = { name: name, accessCode: accessCode, uses: uses,
      expirationDate: expirationDate ? expirationDate : null, context: [this.levelId] };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/' + this.level +
    '/' + this.childLevel + '/create', body);
  }

  disableChild(levels: Array<any>) {
    const body = { context: levels };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/' + this.childLevel + '/disable', body);
  }

  getAccessCodes() {
    const body = { context: [this.levelId] } ;
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname + '/' + this.level + '/getAccessCodes', body);
  }

  editAccessCode(accessCode: any) {
    const body = {accessCode: accessCode, context: [this.parentId]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/' + this.parentLevel +
    '/' + this.level + '/editAccessCode', body);
  }

  getUsers() {
    const body = {context: [this.levelId]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/' + this.level + '/getUsers', body);
  }
}
