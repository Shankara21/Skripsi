
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideDown', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('hide => show', animate('0.5s ease'))
    ])
  ]
})

export class SidebarComponent implements OnInit {

  constructor(private location: Location) { }

  isManage: boolean = false;
  subMenu: boolean = false;
  timer: boolean = false;
  timerDuration: boolean = false;

  dataStability: boolean = false;
  dataMaster: boolean = false;
  isAslt: boolean = false;

  params = this.location.path()

  ngOnInit() {
    if (this.params.includes('data-stability')) {
      this.dataStability = true;
    } else if (this.params.includes('master')) {
      this.dataMaster = true;
    }
    setTimeout(() => {
      this.timer = true;
    }, 200);
    setTimeout(() => {
      this.timerDuration = true;
    }, 2000);
  }

}
