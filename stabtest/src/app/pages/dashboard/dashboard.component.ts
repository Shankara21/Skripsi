import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { MasterService } from './../../services/master/master.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    this.animatePath();
  }

  animatePath() {
    const path = document.getElementById('animatedPath') as SVGPathElement | null;

    if (path) {
      const length = path.getTotalLength();

      // Set stroke-dasharray dan stroke-dashoffset awal
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = length.toString();

      // Membuat animasi menggunakan requestAnimationFrame
      const animate = () => {
        if (path) { // Pastikan path masih ada sebelum mengaksesnya
          path.style.transition = 'stroke-dashoffset 2s ease-in-out';
          path.style.strokeDashoffset = '0';
        }
      };

      // Memulai animasi
      setTimeout(animate, 100); // Menggunakan setTimeout untuk memulai animasi dengan penundaan
    }
  }


  constructor(private MasterService: MasterService, private http: HttpClient, private AuthService: AuthService, private Router: Router) { }

  schedules: any;
  timelines: any;
  temp30: any;
  temp40: any;
  temp50: any;

  user: any;
  greet: string = '';


  ngOnInit() {
    this.user = this.AuthService.GetPayload();

    this.MasterService.getTimeline().subscribe((res: any) => {
      this.timelines = res;
    })
    this.MasterService.getByProduct('1').subscribe((res: any) => {
      this.schedules = res.temp?.temp30;
      this.temp30 = res.temp?.temp30;
      this.temp40 = res.temp?.temp40;
      this.temp50 = res.temp?.temp50;
    })

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
