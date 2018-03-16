import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {


  constructor(private router: Router) {
   }

   

  ngOnInit() {
  }

  

  goToCalendar() {
    this.router.navigateByUrl("/calendar");   
  }

  goToJobs() {
    this.router.navigateByUrl('/jobs');
  }

}
