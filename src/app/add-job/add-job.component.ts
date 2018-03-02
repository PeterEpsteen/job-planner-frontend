import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatFormFieldModule} from '@angular/material';
import { Job } from '../models/job';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  job: Job = new Job();
  constructor(public dialogRef: MatDialogRef<AddJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  addJob() {
    this.dialogRef.close(this.job);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
