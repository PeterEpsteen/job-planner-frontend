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
         description: ''
       });
     }

     saveTodo() {
       if(this.todoForm.valid) {
        this.todoForm.value.date = (this.todoForm.value.date != '')? this.todoForm.value.date : '10/10/2040';
        this.dialogRef.close(this.todoForm.value);
       }
     }

  ngOnInit() {
  }

}
