import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed: boolean;
  noPassword: boolean;
  
  loginInfo: Login = {
    username: "",
    password: ""
  };

  constructor(private router: Router, private cookieService: CookieService, private userService: 
    UserService, private auth: AuthService) { }

  login(): void {

    if (this.loginInfo.password == "") {
      this.noPassword = true;
      return;
    }
    
    this.userService.login(this.loginInfo) 
    .subscribe(user => {
      this.router.navigateByUrl("/jobs");
    }, error => {
      this.loginFailed = true;
    });
  }
  logout(): void {
    this.userService.logout();
  }
  ngOnInit() {
    this.userService.logout();
  }

}
