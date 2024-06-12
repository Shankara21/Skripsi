import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  constructor(){ }

  isAnimate:boolean = true;
  ngOnInit() {
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
  }
}
