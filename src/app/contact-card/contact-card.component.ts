import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { Email } from '../models/email.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  emailForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private emailService: EmailService, private snackBar: MatSnackBar) {    
     this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.emailForm = this.fb.group({
      senderName: ['', Validators.required],
      fromEmail: ['', Validators.required],
      message: ['', Validators.required]
    });
   }

   sendEmail() {
    this.isLoading = true;
    if(this.emailForm.valid) {
      let email = new Email();
      email = this.emailForm.value;
      this.emailService.sendEmail(email).subscribe((res: Response) => {
        if(res.status == 200) {
          this.snackBar.open("Thanks! Email successfully sent.", null, {duration: 2000});
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
          this.snackBar.open("Woops. There was an issue sending your message. Please contact me directly.", null, {duration: 2000});
          console.error(res.json());
        }
      });
    }
  }

}
