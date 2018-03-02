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
import { UserService } from './user.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
responseType: 'text' })
};

@Injectable()
export class JobService {
  private jobsUrl = 'http://localhost:8080/jobs/all';
  private loginUrl = 'http://localhost:8080/users/login';
  private registerUrl = 'http://localhost:8080/users/sign-up';
  private addJobsUrl = 'http://localhost:8080/jobs/add';
  token: string;

  constructor(
    private http: HttpClient, private auth: AuthService, private router: Router, private userService: UserService
  ) { }

  getJobs(): Observable<Job[]> {
    console.log(localStorage.getItem('token'));
    return this.http.get<Job[]>(this.jobsUrl, {
      headers: {'x-access-token': localStorage.getItem('token')}
    });
  }

  addJob(job: Job): Observable<any> {
    console.log(localStorage.getItem('token'));
    httpOptions.headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.post<any>(this.addJobsUrl, job, {
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json'}
    })
    .pipe(
      tap(res => {console.log(res)}),
      catchError(this.handleError<any>('addUser'))
    );
  }
  
  handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

// login(login: Login): Observable<User> {
//   return this.http.post<User>(this.loginUrl, login, httpOptions ).pipe(
//     tap(res => {this.setToken(res.token)}),
//     catchError(this.handleError<User>('login')),
//   );
// }