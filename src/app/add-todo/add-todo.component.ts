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


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private jS: JobService, public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
       this.todoForm = this.fb.group({
         title: '',
         date: '',
         description: ''
       });
     }

     addTodo() {
       this.dialogRef.close(this.todoForm.value);
     }

  ngOnInit() {
  }

}
