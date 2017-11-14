import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Level, SharedService } from './shared.service';

@Injectable()
export class RefurbsService {
  constructor(public httpClient: HttpClient, public sharedService: SharedService) {}

  addRefurb(refurbData, context = [this.sharedService.sectionSelected]) {
    const body = { refurb: refurbData, context: [refurbData.sectionSubmit]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/refurbs/add', body);
  }

  verifyRefurb(refurbData, mistakeDescription?: string, context = [this.sharedService.locationSelected]) {
    const body = { refurb: refurbData, mistakeDescription: mistakeDescription, context: [refurbData.location]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/refurbs/verify', body);
  }

  updateRefurb(refurbData, context = [this.sharedService.locationSelected]) {
    const body = { refurb: refurbData, context: [refurbData.location]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/refurbs/update', body);
  }

  donateRefurbs(refurbs: Array<any>, context = [this.sharedService.locationSelected]) {
    const body = { refurbs: refurbs, context: context };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/refurbs/donate', body);
  }

  getRefurbs(status) {
    const body = { status: status, context: [this.sharedService.locationSelected]};
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/refurbs/get', body);
  }
}
