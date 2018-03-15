import { Injectable } from '@angular/core';
import {Job} from './models/job';
import {JOBS} from './models/mock-jobs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Login } from './models/login';
import { User } from './models/user';
import {Response} from '@angular/http'
import { HttpResponse } from 'selenium-webdriver/http';
import { Subject } from 'rxjs/Subject';
import {AuthService} from './auth.service'
import {Router, Route} from '@angular/router';
import {_throw} from 'rxjs/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
responseType: 'text' })
};

const loginHttpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response'
};

@Injectable()
export class UserService {
  private loginUrl = 'https://www.api.mygigjournal.com/login';
  private googleLoginUrl = 'https://www.api.mygigjournal.com/users/google-login';
  private registerUrl = 'https://www.api.mygigjournal.com/users/sign-up';
  private detailsUrl = 'https://www.api.mygigjournal.com/users/details';
  token: string;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.auth.changeLogin();
  }
  logout() {
    localStorage.removeItem('token');
    this.auth.changeLogin();
    this.router.navigateByUrl("/login");
  }
  editUser(user: User): Observable<User> {
      return this.http.put(`https://www.api.mygigjournal.com/users/${user.id}`,
              user, {headers: {'x-access-token': localStorage.getItem('token')}})
              .pipe(catchError(this.handleError<any>('editUser')));
  }
  login(login: Login): Observable<any> {
    return this.http.post(this.loginUrl, login, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    }).pipe(
      tap((res) => {
        let token = res.headers.get("x-access-token");
        this.setToken(token);
      }),
      catchError(this.handleError<any>('login'))
    );
  }
  googleLogin(token: string): Observable<any> {
    return this.http.post(this.googleLoginUrl, {'token': token}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    }).pipe(
      tap((res) => {
        let token = res.headers.get("x-access-token");
        this.setToken(token);
      }),
      catchError(this.handleError<any>('login'))
    );
  }
  register(login: Login): Observable<any> {
    return this.http.post<User>(this.registerUrl, login, httpOptions )
    .pipe(catchError(this.handleError<any>('register')));
  }
  details() : Observable<User> {
    return this.http.get(this.detailsUrl, {headers: {'x-access-token': localStorage.getItem('token')}})
    .pipe(catchError(this.handleError<any>('details')));
  }

  handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return _throw(error);
    };
  }

}
