import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { LoginComponent } from './login/login.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { HeaderComponent } from './header/header.component';
import {JobService} from './job.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGaurdService} from './auth-gaurd.service';
const routes: Routes = [
  {path: 'jobs', component: JobListComponent, canActivate: [AuthGaurdService]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    LoginComponent,
    JobDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  entryComponents: [JobDetailComponent],
  providers: [CookieService, JobService, ,AuthGaurdService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
