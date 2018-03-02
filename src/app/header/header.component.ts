import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.isLoggedInChange.subscribe(
      result => {
        this.loggedIn = result;
      }
    )
  }

  logout() {
    
    localStorage.removeItem("token");
    this.router.navigateByUrl("/");
  }

}
