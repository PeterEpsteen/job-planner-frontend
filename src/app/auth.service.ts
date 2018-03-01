import { Injectable } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() { }
  public isAuthenticated(): boolean {
    let jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    return !jwtHelper.isTokenExpired(token);
  }
}
