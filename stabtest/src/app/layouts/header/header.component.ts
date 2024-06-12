import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private AuthService: AuthService, public Router: Router) { }
  user: any;
  time: any;
  greet: string = '';

  ngOnInit() {

    this.user = this.AuthService.GetPayload();
    // make greet based on time and set time out every 1 hour
    let today = new Date();
    let curHr = today.getHours();
    if (curHr < 12) {
      this.greet = 'Good Morning';
    } else if (curHr < 18) {
      this.greet = 'Good Afternoon';
    } else {
      this.greet = 'Good Evening';
    }
    setTimeout(() => {
      this.ngOnInit();
    }
      , 3600000);
  }
  logOut() {
    this.AuthService.DeleteToken();
    this.user = null;
    this.Router.navigateByUrl('/auth');
  }

}
