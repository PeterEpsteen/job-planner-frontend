import { Component, OnInit, Inject } from '@angular/core';
import {Job} from '../models/job';
import {JOBS} from '../models/mock-jobs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {JobDetailComponent} from '../job-detail/job-detail.component'
import {JobService} from '../job.service';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[];
  selectedJob: Job;
  list = false;
  newJob: Job;
  viewSetting = "Grid";
  constructor(public dialog: MatDialog, private jobService: 
    JobService) {  }

    getJobs(): void {
      this.jobService.getJobs()
          .subscribe(jobs => this.jobs = jobs);
    }

  onSelect(job: Job): void {
    this.selectedJob = job;
  }

  listView(): void {
    this.list = !this.list;
    this.viewSetting = (this.viewSetting === "Grid") ? "List":"Grid";
  }

  ngOnInit() {
    this.getJobs();
  }

  openDialog(job: Job): void {
      let dialogRef = this.dialog.open(JobDetailComponent, {
        width: '400px',
        data: job
      });
      dialogRef.afterClosed().subscribe(result => {
        this.newJob = result;
      })
  }

}
