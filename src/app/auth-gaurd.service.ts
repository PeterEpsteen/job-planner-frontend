import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(public auth: AuthService, public router: Router
  , public snackbar: MatSnackBar) { }

  canActivate():  boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/register');
      let config = new MatSnackBarConfig();
      config.verticalPosition = "top";
      config.panelClass = ['accent'];
      config.duration = 2000;
      this.snackbar.open("Please login to view this page", null, config);
      return false;
    }
    return true;
  }
}
