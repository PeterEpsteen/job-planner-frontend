import { Component, OnInit, Input, Inject } from '@angular/core';
import {Job} from '../models/job';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { JobService } from '../job.service';
import { Route, ActivatedRoute, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AddJobComponent } from '../add-job/add-job.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {


  job: Job;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private jobService: JobService) { 
    }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJob(id).subscribe(job => {this.job = job});
  }

  addTodo() {
    let dialogRef = this.dialog.open(AddTodoComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.jobService.addTodo(result, this.job.id).subscribe(res => {this.ngOnInit()});
    });
  }

  deleteTodo(id: number) {
    this.jobService.deleteTodo(id).subscribe(res => {this.ngOnInit()});
  }

}
