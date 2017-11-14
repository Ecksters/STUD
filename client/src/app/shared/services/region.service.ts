import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { LevelService } from './level.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RegionService extends LevelService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {
    super('region', httpClient, sharedService);
  }
}
