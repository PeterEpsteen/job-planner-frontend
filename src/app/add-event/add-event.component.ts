import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatFormFieldModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
       this.eventForm = this.fb.group({
         title: ['', Validators.required],
         date: '',
         description: ''
       });
     }

     saveEvent() {
       if(this.eventForm.valid)
       this.dialogRef.close(this.eventForm.value);
     }

  ngOnInit() {
  }

}
