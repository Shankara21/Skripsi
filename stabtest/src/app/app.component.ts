import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router) { }
  title = 'stabtest';

  ngOnInit() {
    AOS.init();
    AOS.refresh();
    // window.addEventListener('load', AOS.refresh)
  };
}
