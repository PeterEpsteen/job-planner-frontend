import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: []
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  openMenu: boolean;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
      this.auth.isLoggedIn.subscribe(value => {
        this.loggedIn = value;
      });
   }

   toggleMenu() {
    this.openMenu = !this.openMenu;
   }

  ngOnInit() {
    this.loggedIn = this.auth.isAuthenticated();
    this.openMenu = false;
  }

  logout() {
    this.toggleMenu();
    this.userService.logout();
  }

}
