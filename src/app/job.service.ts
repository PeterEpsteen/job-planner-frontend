import { Injectable } from '@angular/core';
import {Job} from './models/job';
import {JOBS} from './models/mock-jobs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class JobService {
  private jobsUrl = 'http://localhost:8080/jobs/1';
  constructor(
    private http: HttpClient
  ) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }

}
