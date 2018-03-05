import { Component, OnInit, Inject } from '@angular/core';
import {Job} from '../models/job';
import {JOBS} from '../models/mock-jobs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonBase} from '@angular/material';
import {JobDetailComponent} from '../job-detail/job-detail.component'
import {JobService} from '../job.service';
import { AddJobComponent } from '../add-job/add-job.component';
import { Router } from '@angular/router';
import { Todo } from '../models/todo';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  isLoading: boolean;
  jobs: Job[];
  selectedJob: Job;
  list = false;
  newJob: Job;
  colors = ["", "blue", "violet", "green", "yellow"];
  randomColor = this.getRandomColor();
  viewSetting = "List";
  constructor(public dialog: MatDialog, private jobService: 
    JobService, private router: Router) {  }

    getJobs(): void {
      this.jobService.getJobs()
          .subscribe(jobs => {
            this.jobs = jobs;
            this.isLoading = false;
          });
    }

    sortByDate(a: Todo, b: Todo): number {
      let bDate = new Date(b.date);
      let aDate = new Date(a.date);
      return aDate.getTime() -  bDate.getTime();
  }

  getNearestTask(job: Job) {
    let inProgressTodos = job.todos.filter(todo => todo.complete != 'true');
    return inProgressTodos.sort(this.sortByDate)[0];
  }

  onSelect(job: Job): void {
    this.selectedJob = job;
  }

  listView(): void {
    this.list = !this.list;
    this.viewSetting = (this.viewSetting === "Grid") ? "List":"Grid";
  }

  ngOnInit() {
    this.isLoading = true;
    this.getJobs();
  }
  addJob() {
    let dialogRef = this.dialog.open(AddJobComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.newJob = result;
        this.newJob.dateAdded = new Date(Date.now()).toDateString();
        this.addJobToServer();
        }
    });
  }
  getRandomColor(): string {
    let rand: number = Math.floor(Math.random() * 6);
    return this.colors[rand];
  }
  addJobToServer() {
    console.log(this.newJob);
      this.jobService.addJob(this.newJob).subscribe(res => {this.ngOnInit()});
  }

  openDetails(job: Job): void {
      this.router.navigateByUrl("/job/" + job.id);
  }

}
