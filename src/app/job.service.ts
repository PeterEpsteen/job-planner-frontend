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
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
responseType: 'text' })
};

@Injectable()
export class JobService {
  private jobsUrl = 'http://localhost:8080/jobs/1';
  private loginUrl = 'http://localhost:8080/users/login';
  private registerUrl = 'http://localhost:8080/users/sign-up';
  token: string;
  tokenChange: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  getJobs(): Observable<Job[]> {
    // return this.http.get<Job[]>(this.jobsUrl);
    return of(JOBS);
  }
  changeToken(token: string) {
    this.tokenChange()
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(this.loginUrl, login, httpOptions ).pipe(
      catchError(this.handleError<User>('login'))
    );
  }
  register(login: Login): Observable<any> {
    return this.http.post<any>(this.registerUrl, login, httpOptions )
    .pipe(catchError(this.handleError<any>('register')));
  }

  handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
