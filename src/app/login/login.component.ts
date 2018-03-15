import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, NgZone } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  loginFailed: boolean;
  noPassword: boolean;
  
  loginInfo: Login = {
    username: "",
    password: ""
  };

  constructor(private router: Router, private cookieService: CookieService, private userService: 
    UserService, private auth: AuthService, private ngZone: NgZone) { }

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

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '326615198026-1s510evbld23rhgm9jkihk4mf9fh1016.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.userService.googleLogin(token).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl("/jobs"));
        }, err => {this.loginFailed = true});


      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

ngAfterViewInit(){
  this.googleInit();
}

}
