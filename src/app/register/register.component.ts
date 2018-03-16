import { Component, OnInit, EventEmitter, NgZone, AfterViewInit } from '@angular/core';
import {Login} from '../models/login';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
 

declare const gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  shortPassword: boolean;
  nameTaken: boolean;
  registerFailed: boolean;
  noPassword: boolean;
  serverError: boolean;
  shortName: boolean;
  confirmPassword: String;
  isLoading: boolean;
  googleLoginFailed: boolean;
  loginInfo = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  token: string;
  constructor(private router: Router, private cookieService: CookieService, private userService: 
    UserService, private auth: AuthService, private ngZone: NgZone) { }
  

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
        console.log("from component..." + error);
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
        this.isLoading = true;

        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.userService.googleLogin(token).subscribe(res => {
          this.ngZone.run(() => {this.router.navigateByUrl("/jobs"); this.isLoading = false;});
        }, err => {this.googleLoginFailed = true});


      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

ngAfterViewInit(){
  this.googleInit();
}


  ngOnInit() {
    
  }

}
