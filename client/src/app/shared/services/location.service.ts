import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelService } from './level.service';

@Injectable()
export class LocationService extends LevelService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {
    super('location', httpClient, sharedService);
  }
}
