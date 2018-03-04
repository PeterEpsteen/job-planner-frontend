import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatFormFieldModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
       this.contactForm = this.fb.group({
         name: '',
         title: '',
         email: '',
         phone: ''
       });
     }

     saveContact() {
       console.log(this.contactForm.value)
       this.dialogRef.close(this.contactForm.value);
     }

  ngOnInit() {
  }

}