import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatsService } from './stats.service';

@Injectable()
export class StatsByLocationService extends StatsService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {
    super('location', httpClient, sharedService);
  }
}
