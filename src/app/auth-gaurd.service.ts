import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(public auth: AuthService, public router: Router
  , public snackbar: MatSnackBar) { }

  canActivate():  boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      this.snackbar.open("Please login to view this page", null, {
        duration: 2000,
      });
      return false;
    }
    return true;
  }
}
