import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {JobService} from '../job.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

 
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
  
  constructor(private router: Router, private cookieService: CookieService, private jobService: 
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
    this.router.navigateByUrl("/jobs");
  }

  register(): void {
    this.jobService.register(this.loginInfo)
    .subscribe(body => {
      alert("Registered");
    })
  }

  

  ngOnInit() {
  }

}
