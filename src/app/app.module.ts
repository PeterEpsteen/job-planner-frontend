import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import {RegisterComponent} from './register/register.component'
import { LoginComponent } from './login/login.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { HeaderComponent } from './header/header.component';
import {JobService} from './job.service';
import {UserService} from './user.service'
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGaurdService} from './auth-gaurd.service';
import { AddJobComponent } from './add-job/add-job.component';
import {
  MatOptionModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { AddTodoComponent } from './add-todo/add-todo.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'jobs', component: JobListComponent, canActivate: [AuthGaurdService]},
  {path: 'job/:id', component: JobDetailComponent, canActivate: [AuthGaurdService]},
  {path: '**', redirectTo: 'jobs'}
];

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    LoginComponent,
    JobDetailComponent,
    HeaderComponent,
    RegisterComponent,
    AddJobComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  entryComponents: [JobDetailComponent, AddJobComponent, AddTodoComponent],
  providers: [CookieService, JobService, ,AuthGaurdService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
