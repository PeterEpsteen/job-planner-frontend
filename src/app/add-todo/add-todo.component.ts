import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatFormFieldModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
       this.todoForm = this.fb.group({
         title: ['', Validators.required],
         date: '',
         time: '',
         description: ''
       });
     }

     saveTodo() {
       if(this.todoForm.valid) {
        let date: Date = new Date();
        date.setFullYear(2040);
        date.setDate(10);
        date.setMonth(9);
        if(this.todoForm.value.date != '') {
          if(this.todoForm.value.time != 0) {
          this.todoForm.value.date.setHours(+this.todoForm.value.time.split(":")[0]);
          this.todoForm.value.date.setMinutes(+this.todoForm.value.time.split(":")[1]);
          this.todoForm.value.date.setSeconds(33);
          console.log(this.todoForm.value.date);
          }
        }
        else {
          this.todoForm.value.date = date;
        }
        this.dialogRef.close(this.todoForm.value);
       }
     }

  ngOnInit() {
  }

}
