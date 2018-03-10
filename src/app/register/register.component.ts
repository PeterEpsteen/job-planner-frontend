import { Component, OnInit, EventEmitter } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  shortPassword: boolean;
  nameTaken: boolean;
  registerFailed: boolean;
  noPassword: boolean;
  serverError: boolean;
  shortName: boolean;
  confirmPassword: String;
  loginInfo = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  token: string;
  constructor(private router: Router, private cookieService: CookieService, private userService: 
    UserService, private auth: AuthService) { }
  

  register(): void {
    this.clearErrors();
    if(this.loginInfo.username.length < 6) {
      this.shortName = true;
      return;
    }
    if(this.loginInfo.password == "") {
      this.noPassword = true;
      return;
    }
    if(this.loginInfo.password.length < 8) {
      this.shortPassword = true;
      return;
    }
    if (this.loginInfo.password != this.confirmPassword) {
      this.registerFailed = true;
      return;
    }
    else {
      this.userService.register(this.loginInfo)
      .subscribe(body => {
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error)
        if(error.status == 400) {
          this.nameTaken = true;
          return;
        }
      this.serverError = true
    });
    }
  }
  clearErrors() {
    this.shortPassword = false;
    this.nameTaken = false;
    this.noPassword = false;
    this.serverError = false;
    this.shortName = false;

  }

  

  ngOnInit() {
    
  }

}
