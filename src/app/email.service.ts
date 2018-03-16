import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import {Email} from './models/email.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
responseType: 'text' })
}

@Injectable()
export class EmailService {
  private emailUrl = 'https://www.api.mygigjournal.com/email/send';

  constructor(private http: HttpClient) { }

  sendEmail(email: Email): Observable<any> {
    return this.http.post(this.emailUrl, email, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
     }), observe: 'response'});
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
