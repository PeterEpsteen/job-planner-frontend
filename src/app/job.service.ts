import { Injectable } from '@angular/core';
import {Job} from './models/job';
import {JOBS} from './models/mock-jobs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Login } from './models/login';
import { Todo } from './models/todo';
import { User } from './models/user';
import { Company } from './models/company';
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

  autoCompleteCompanies(text: string): Observable<Company[]> {
    return this.http.get<Company[]>(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${text}`)
    .pipe(tap(res => {console.log(res)}));
  }

  getJob(id: number) {
    return this.http.get<Job>(`http://localhost:8080/jobs/${id}`, {headers: {'x-access-token': localStorage.getItem('token')}})
    .pipe(catchError(this.handleError<any>('getJob')));
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

  addTodo(todo: Todo, id: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/jobs/todo/${id}`, todo,  {
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json'}
    })
    .pipe(
      tap(res => {console.log(res)}),
      catchError(this.handleError<any>('addTodo'))
    );
  }

  getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`http://localhost:8080/jobs/todo/${id}`, {
      headers: {'x-access-token': localStorage.getItem('token')}
    });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/jobs/todo/${id}`,  {
      headers: {'x-access-token': localStorage.getItem('token')}
    })
    .pipe(
      tap(res => {console.log(res)}),
      catchError(this.handleError<any>('deleteTodo'))
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