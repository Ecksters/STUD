import { HttpClient } from '@angular/common/http';
import { Level, SharedService } from './shared.service';

export class StatsService {
  constructor(public level: string, public httpClient: HttpClient, public sharedService: SharedService) {
  }
  getStats() {
    const body = { context: [this.sharedService[this.level + 'Selected']] };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname + '/' + this.level + 'Stats/leaderboards', body);
  }
}
