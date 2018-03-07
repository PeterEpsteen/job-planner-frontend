import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginError: boolean;
  passwordMismatch: boolean;
  passwordInvalid: boolean;
  isLoading: boolean;
  user: User;
  editUserForm: FormGroup;
  constructor(public userService: UserService, public snackbar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
     this.editUserForm = this.fb.group({
       username: '',
       firstName: '',
       lastName: '',
       email: '',
       currentPassword: ['', Validators.required],
       password: '',
       confirmPassword: ''
     });
   }

  ngOnInit() {
    this.isLoading = true;
    this.loginError = false;
    this.passwordMismatch = false;
    this.passwordInvalid = false;
    this.userService.details().subscribe(user => {this.user = user;
    this.isLoading = false;},
        error => {console.log(error);});
  }

  editUser() {
    this.passwordInvalid = false;
    this.passwordMismatch = false;
    this.loginError = false;
    if(this.editUserForm.valid) {
      if(this.editUserForm.value.password != '' || this.editUserForm.value.confirmPassword != '' ) {
        if(this.editUserForm.value.password !== this.editUserForm.value.confirmPassword)
          {
            console.log("error: passwords don't match");
            this.passwordMismatch = true;
            return;
          }
          if(this.editUserForm.value.password.length < 7) {
            this.passwordInvalid = true;
            return;
          }
      }
      let currentId = this.user.id;
      let confirmId = 0;
      let login = {
        username: this.user.username,
        password: this.editUserForm.value.currentPassword
      };
      this.userService.login(login).subscribe(user => {
       this.userService.setToken(user.token);
        this.userService.details().subscribe(user => {this.editUserConfirmed(user.id);}, error => {console.log(error);}
      );
    }, error=> {
        this.loginError = true;
        this.openSnackBar("Invalid login. Please check that your password is correct.", null)});
    }

    else {
      this.loginError = true;
      console.log("form not valid.");
    }
  }

  editUserConfirmed(currentId: number) {
    let confirmId = this.user.id;
    if(confirmId === currentId) {
        let newEmail = (this.editUserForm.value.email != '') ?
          this.editUserForm.value.email : this.user.email;
        let updatedUser = {
        id: this.user.id,
        email: (this.editUserForm.value.email != '') ?
                        this.editUserForm.value.email : this.user.email,
        firstName: (this.editUserForm.value.firstName != '') ?
                    this.editUserForm.value.firstName : this.user.firstName,
        lastName: (this.editUserForm.value.lastName != '') ?
                    this.editUserForm.value.lastName : this.user.lastName,
        password: (this.editUserForm.value.password != '') ? 
                  this.editUserForm.value.password : this.editUserForm.value.currentPassword,
        username: (this.editUserForm.value.username != '') ?
                  this.editUserForm.value.username : this.user.username,
        token: ''
        }

        this.userService.editUser(updatedUser).subscribe(res => {
          this.openSnackBar("Successfully update info.", null);
          console.log(res);
          this.ngOnInit();
        },
        error => {this.openSnackBar("New info rejected. Please try a different username.", null);});
    }

    else {
      console.log('ids dont match: ' + confirmId + " " + currentId);
      this.loginError = true;
    }
}
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 2000,
  });
}


}
