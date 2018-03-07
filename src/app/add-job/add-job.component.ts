import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatFormFieldModule} from '@angular/material';
import { Job } from '../models/job';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { JobService } from '../job.service';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Company } from '../models/company';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  companyForm: FormGroup;
  job: Job = new Job();
  suggestCompanies: Observable<Job[]>;
  companies: Company[];
  titles;
  constructor(private jS: JobService, public dialogRef: MatDialogRef<AddJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.createForm();
    } 

    createForm() {
      this.companyForm = this.fb.group({
        company: '',
        title: '',
        companyDomain: '',
      });
      
    }

  ngOnInit() {
    this.companyForm.get('company').valueChanges
      .subscribe(term => {
        if(term === '') {
          this.companies = [];
        }
        else {
          this.jS.autoCompleteCompanies(term).subscribe(res => this.companies = res);
        }
      });
  }

  setUrl(url: string) {
    this.companyForm.get('companyDomain').setValue(url);
  }


  addJob() {
    this.job = this.companyForm.value;
    this.dialogRef.close(this.job);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
