import { Component, OnInit, Input, Inject } from '@angular/core';
import {Job} from '../models/job';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { JobService } from '../job.service';
import { Route, ActivatedRoute, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AddJobComponent } from '../add-job/add-job.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../models/todo';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventModel } from '../models/event';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { Contact } from '../models/contact';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  serverError: boolean;
  isLoading: boolean;
  inProgressTodos: Todo[];
  completeTodos: Todo[];
  events: EventModel[];
  job: Job;
  contacts: Contact[];
  constructor(public snackbar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private jobService: JobService) { 
    }

  ngOnInit() {
    this.serverError = false;
    this.isLoading = true;
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJob(id).subscribe(job => {
      this.job = job; this.initializeJob();
    }, err => {this.serverError = true;});
  }

  initializeJob(): void {
    this.inProgressTodos = this.job.todos.filter(todo => todo.complete != 'true');
    console.log(this.inProgressTodos);
    this.inProgressTodos.sort(this.sortByDate);
    console.log(this.inProgressTodos);
    this.completeTodos = this.job.todos.filter(todo => todo.complete == 'true');
    this.completeTodos.sort(this.sortByDate);
    this.events = this.job.events;
    this.events.sort(this.eventSortByDate);
    this.contacts = this.job.contacts;
    this.contacts.sort();
    this.isLoading = false; //sort by name
  }
  sortByDate(a: Todo, b: Todo): number {
      let bDate = new Date(b.date);
      let aDate = new Date(a.date);
      return aDate.getTime() -  bDate.getTime();
  }
  eventSortByDate(a: EventModel, b: EventModel): number {
    let bDate = new Date(b.date);
    let aDate = new Date(a.date);
    return bDate.getTime() - aDate.getTime() ;
}

dateValid(todo: Todo): boolean {
  return !(new Date(todo.date).getFullYear() > 2039 );
}

  pastDue(date: string): string {
    return (new Date(date).getTime() > Date.now()) ? '' : 'red';
  }

  addTodo() {
    let dialogRef = this.dialog.open(AddTodoComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.isLoading = true;
        console.log(result);
        this.jobService.addTodo(result, this.job.id).subscribe(res => {this.ngOnInit()});
        }
      });
    }

  addEvent() {
    let dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.isLoading = true;
        console.log(result);
        this.jobService.addEvent( result, this.job.id).subscribe(res => {this.ngOnInit()});
        }
    });
  }

  addContact() {
    let dialogRef = this.dialog.open(AddContactComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.isLoading = true;
        console.log(result);
        this.jobService.addContact(result, this.job.id).subscribe(res => {this.ngOnInit()});
      }
    });
  }

  deleteContact(id: number) {
    this.isLoading = true;

    this.jobService.deleteContact(id).subscribe(res => {
      this.ngOnInit()
      this.snackbar.open("Contact deleted", null, {
        duration: 2000
      });
    });
  }

  deleteEvent(id: number) {
    this.isLoading = true;

    this.jobService.deleteEvent(id).subscribe(res => {
      this.ngOnInit();
      this.snackbar.open("Event Deleted", null, {
        duration: 2000
      });
    });
  }

  deleteJob() {
    let snackbarRef = this.snackbar.open("Are you sure you want to delete this job?", "Yes", {
      duration: 4000,
    });
    snackbarRef.onAction().subscribe(() => {
      this.jobService.deleteJob(this.job.id).subscribe(success => {
        this.router.navigateByUrl("/jobs");
        this.snackbar.open("Job Deleted", null, {
          duration: 2000
        });
      }, error => {this.serverError = true;});
    });
    
  }

  checkTodo(e, todo: Todo) {
      todo.complete = (todo.complete == 'true')? 'false' : 'true';
      this.jobService.updateTodo(todo).subscribe(res => {
        this.ngOnInit();
      }, error => {this.serverError = true});

    console.log(todo);

    
  } 

  deleteTodo(id: number) {
    this.isLoading = true;
    this.jobService.deleteTodo(id).subscribe(res => {
      this.ngOnInit();
      this.snackbar.open("Task Deleted", null, {
        duration: 2000
      });
    }, error => {this.serverError = true;});
  }

}
