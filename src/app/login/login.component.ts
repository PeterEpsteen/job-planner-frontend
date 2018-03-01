import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {JobService} from '../job.service';
import {CookieService} from 'ngx-cookie-service';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: Login = {
    username: "",
    password: ""
  };

  token: string;

  cookieValue: string;
  
  constructor(private cookieService: CookieService, private jobService: 
    JobService) { }

  login(): void {
    this.jobService.login(this.loginInfo) 
    .subscribe(user => {
      this.token = user.token;
      this.setToken();
    });
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  setToken(): void {
    localStorage.setItem("token", this.token);
  }

  

  ngOnInit() {
  }

}
