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
import { AddEventComponent } from './add-event/add-event.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'jobs', component: JobListComponent, canActivate: [AuthGaurdService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService]},
  {path: 'job/:id', component: JobDetailComponent, canActivate: [AuthGaurdService]},
  {path: 'about', component: AboutPageComponent},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGaurdService]},
  {path: '**', redirectTo: 'about'}
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
    AddTodoComponent,
    AddEventComponent,
    AddContactComponent,
    AboutPageComponent,
    CalendarComponent,
    ProfileComponent
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
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  entryComponents: [JobDetailComponent, AddJobComponent, AddTodoComponent, AddContactComponent, AddEventComponent],
  providers: [CookieService, JobService, AuthGaurdService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
