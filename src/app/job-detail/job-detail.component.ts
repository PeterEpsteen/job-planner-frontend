import { Component, OnInit, Input, Inject } from '@angular/core';
import {Job} from '../models/job';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {


  job: Job;
  constructor(public dialogRef: MatDialogRef<JobDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
    this.job = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
