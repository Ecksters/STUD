import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) {
  }

  getUser(id: number) {
    const body = { id: id };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/getUser', body);
  }

  updateUser(user: any) {
    const body = user;
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/updateUser', body);
  }

  logout() {
    const body = { logout: true };
    this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/logout', body)
    .subscribe(() => window.location.replace('/'));
  }

  register(name: String, email: String, password: String, accessCode: String) {
    const body = { name: name, email: email, password: password, accessCode: accessCode };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/register', body);
  }

  setStayLoggedIn(newValue: boolean) {
    const body = { stayLoggedIn: newValue };
    return this.httpClient.post(window.location.protocol + '//' + window.location.hostname  + '/users/setStayLoggedIn', body);
  }
}
