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


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  isLoading: boolean;
  inProgressTodos: Todo[];
  completeTodos: Todo[];
  events: EventModel[];
  job: Job;
  contacts: Contact[];
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private jobService: JobService) { 
    }

  ngOnInit() {
    this.isLoading = true;
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJob(id).subscribe(job => {this.job = job; this.initializeJob();});
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
      this.isLoading = true;
      console.log(result);
      this.jobService.addTodo(result, this.job.id).subscribe(res => {this.ngOnInit()});
    });
  }

  addEvent() {
    let dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      console.log(result);
      this.jobService.addEvent(result, this.job.id).subscribe(res => {this.ngOnInit()});
    });
  }

  addContact() {
    let dialogRef = this.dialog.open(AddContactComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      console.log(result);
      this.jobService.addContact(result, this.job.id).subscribe(res => {this.ngOnInit()});
    });
  }

  deleteContact(id: number) {
    this.isLoading = true;

    this.jobService.deleteContact(id).subscribe(res => {this.ngOnInit()});
  }

  deleteEvent(id: number) {
    this.isLoading = true;

    this.jobService.deleteEvent(id).subscribe(res => {this.ngOnInit();});
  }

  checkTodo(e, todo: Todo) {
    if(e.checked) {
      //update backend that it's checked
      console.log('checked');
      todo.complete = 'true';
      this.jobService.updateTodo(todo).subscribe(res => {console.log(res); this.ngOnInit();});
    }
    else {
      console.log('unchecked');
      todo.complete = 'false';
      this.jobService.updateTodo(todo).subscribe(res => {this.ngOnInit();});
    }
    console.log(todo);

    console.log(e);
    
  } 

  deleteTodo(id: number) {
    this.isLoading = true;
    this.jobService.deleteTodo(id).subscribe(res => {this.ngOnInit();});
  }

}
