import { MasterService } from './../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { zoomInOutVar } from 'src/Animation';
import { ChartOptions } from 'src/ApexChart';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  animations: [zoomInOutVar]
})
export class ScheduleComponent implements OnInit {

  public chartOptions: Partial<ChartOptions> | any;

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService) { }


  today = startOfToday();
  currentMonth = format(this.today, 'MMMM-yyyy');
  firstDayCurrentMonth = parse(this.currentMonth, 'MMMM-yyyy', new Date());

  selectedDay = this.today;

  setSelectedDay(day: any) {
    this.selectedDay = day;
  }

  events: any[] = [];

  dataModal: any;

  scheduleSoyjoy: any = [];
  schedulePS: any = [];
  schedulePSIW: any = [];
  scheduleNewProduct: any = [];


  // Indicator in calendar
  isSoyjoy: boolean = false;
  soyjoyLength: any = [];
  isPS: boolean = false;
  psLength: any = [];
  isPSIW: boolean = false;
  psiwLength: any = [];
  isNewProduct: boolean = false;
  newProductLength: any = [];

  isEvent: boolean = false;

  format = format;
  getDay = getDay;
  isSameMonth = isSameMonth;
  isToday = isToday;
  isEqual = isEqual;
  isSameDay = isSameDay;


  days = eachDayOfInterval({
    start: this.firstDayCurrentMonth,
    end: endOfMonth(this.firstDayCurrentMonth)
  })

  previousMonth() {
    this.firstDayCurrentMonth = add(this.firstDayCurrentMonth, { months: -1 })
    this.ngOnInit()
  }
  nextMonth() {
    this.firstDayCurrentMonth = add(this.firstDayCurrentMonth, { months: 1 })
    this.ngOnInit()
  }

  selectedDayMeeting: any;

  classNames(...classes: any[]): any {
    return classes.filter(Boolean).join(" ");
  }
  colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  details: any;

  isAnimate: boolean = true;

  isChart: boolean = true;

  weekly: any

  ngOnInit() {
    this.spinner.show();
    this.days = eachDayOfInterval({
      start: this.firstDayCurrentMonth,
      end: endOfMonth(this.firstDayCurrentMonth)
    })
    this.selectedDayMeeting = this.events.filter((meeting) => {
      return isSameDay(parseISO(meeting.date), this.selectedDay)
    })
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    this.scheduleSoyjoy = [];
    this.schedulePS = [];
    this.schedulePSIW = [];
    this.scheduleNewProduct = [];

    this.MasterService.getEvent().subscribe((res: any) => {
      this.events = res;
      this.events.filter((meeting: any) => {
        if (meeting.DataStability.productId == 1) {
          this.scheduleSoyjoy.push(meeting);
        } else if (meeting.DataStability.productId == 2) {
          this.schedulePS.push(meeting);
        } else if (meeting.DataStability.productId == 3) {
          this.schedulePSIW.push(meeting);
        } else if (meeting.DataStability.productId == 4) {
          this.scheduleNewProduct.push(meeting);
        }
      })
    }, (err: any) => { }, () => {
    })
    this.MasterService.weeklyEvents().subscribe((res: any) => {
      this.weekly = res;
      if (this.weekly.done == 0 && this.weekly.notYet == 0) {
        this.isChart = false;
      }
      this.chart();
    }, (err: any) => { }, () => {
      this.spinner.hide();
    })
  }

  getDataModal(date: any) {
    let formatDate = moment(date).format('MMMM Do, YYYY');
    this.dataModal = {
      date,
      scheduleSoyjoy: [],
      schedulePs: [],
      schedulePsiw: [],
      scheduleNewProduct: []
    }
    this.selectedDayMeeting = this.events.filter((meeting) => {
      return isSameDay(parseISO(meeting.date), date)
    })
    this.selectedDayMeeting.forEach((element: any) => {
      if (element.DataStability.productId == 1) {
        this.dataModal.scheduleSoyjoy.push(element);
      } else if (element.DataStability.productId == 2) {
        this.dataModal.schedulePs.push(element);
      } else if (element.DataStability.productId == 3) {
        this.dataModal.schedulePsiw.push(element);
      } else if (element.DataStability.productId == 4) {
        this.dataModal.scheduleNewProduct.push(element);
      }
    });
    console.log(this.dataModal);
  }

  isEventExist(day: any) {
    return this.events.filter((meeting) => {
      return isSameDay(parseISO(meeting.date), day)
    }).length > 0
  }

  checkSoyjoy(day: any) {
    this.soyjoyLength = this.scheduleSoyjoy.filter((meeting: any) => {
      return isSameDay(parseISO(meeting.date), day)
    }).length;

    if (this.soyjoyLength > 0) {
      this.isSoyjoy = true;
      return true;
    } else {
      this.isSoyjoy = false;
      return false;
    }
  }

  checkPS(day: any) {
    this.psLength = [];
    this.psLength = this.schedulePS.filter((meeting: any) => {
      return isSameDay(parseISO(meeting.date), day)
    }).length;
    if (this.psLength > 0) {
      this.isPS = true;
      return true;
    } else {
      this.isPS = false;
      return false;
    }
  }

  checkPSIW(day: any) {
    this.psiwLength = [];
    this.psiwLength = this.schedulePSIW.filter((meeting: any) => {
      return isSameDay(parseISO(meeting.date), day)
    }).length;
    if (this.psiwLength > 0) {
      this.isPSIW = true;
      return true;
    } else {
      this.isPSIW = false;
      return false;
    }
  }

  checkNewProduct(day: any) {
    this.newProductLength = [];
    this.newProductLength = this.scheduleNewProduct.filter((meeting: any) => {
      return isSameDay(parseISO(meeting.date), day)
    }).length;
    if (this.newProductLength > 0) {
      this.isNewProduct = true;
      return true;
    } else {
      this.isNewProduct = false;
      return false;
    }
  }

  chart() {
    this.chartOptions = {
      series: [this.weekly.done, this.weekly.notYet],
      chart: {
        height: 300,
        type: "donut"
      },
      colors: ['#11468F', '#9BA4B5'],
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opts: any) {
          return opts.w.config.series[opts.seriesIndex]
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w: any) {
                  return w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b
                  }, 0)
                }
              }
            }
          }
        }
      },
      labels: ['Done', 'Not Yet'],
      fill: {
        type: "gradient"
      },
      legend: {
        position: 'bottom',
        show: 'true',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getEvent(day: any) {
    this.events.filter((meeting) => {
      return isSameDay(parseISO(meeting.date), day)
    })
  }

  getDetails(event: any) {
    this.MasterService.showEvent(event).subscribe((res: any) => {
      this.details = res;
    })
  }

}
