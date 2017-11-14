import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { LevelService } from './level.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SystemService extends LevelService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {
    super('system', httpClient, sharedService);
  }
}

/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SystemService {
  constructor(private httpClient: HttpClient) {
  }

  createRegion(name: string, accessCode: string) {
    const body = { name: name, accessCode: accessCode };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/system/region/create', body);
  }

  disableRegion(id: string) {
    const body = { context: [id]} ;
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/system/region/disable', body);
  }
}
*/
