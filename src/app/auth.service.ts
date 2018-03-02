import { Injectable } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  isLoggedIn: boolean;
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();
  constructor() { }
  public isAuthenticated(): boolean {
    let jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    if(token != null) {
      return !jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public changeLogin() {
    this.isLoggedIn = this.isAuthenticated();
    this.isLoggedInChange.next(this.isLoggedIn);
  }
}
