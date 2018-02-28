import { Component, OnInit } from '@angular/core';
import {Job} from '../models/job';
import {JOBS} from '../models/mock-jobs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs = JOBS;
  selectedJob: Job;
  list = false;
  viewSetting = "Grid";
  constructor() {  }

  onSelect(job: Job): void {
    this.selectedJob = job;
  }

  listView(): void {
    this.list = !this.list;
    this.viewSetting = (this.viewSetting === "Grid") ? "List":"Grid";
  }

  ngOnInit() {
  }

}
