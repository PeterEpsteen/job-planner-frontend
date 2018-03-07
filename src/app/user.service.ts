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


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
responseType: 'text' })
};

@Injectable()
export class UserService {
  private loginUrl = 'https://www.api.mygigjournal.com/users/login';
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
  login(login: Login): Observable<User> {
    return this.http.post<User>(this.loginUrl, login, httpOptions ).pipe(
      tap(res => {this.setToken(res.token)}),
      catchError(this.handleError<User>('login')),
    );
  }
  register(login: Login): Observable<User> {
    return this.http.post<User>(this.registerUrl, login, httpOptions )
    .pipe(catchError(this.handleError<User>('register')));
  }
  details() : Observable<User> {
    return this.http.get(this.detailsUrl, {headers: {'x-access-token': localStorage.getItem('token')}})
    .pipe(catchError(this.handleError<any>('details')));
  }

  handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error);
    };
  }

}
