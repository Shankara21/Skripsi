import { MasterService } from './../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { PieChartOptions, yearlyDataOptions, sectionDataOptions } from 'src/ApexChart';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-monitoring-room',
  templateUrl: './monitoring-room.component.html',
  styleUrls: ['./monitoring-room.component.css']
})
export class MonitoringRoomComponent implements OnInit {


  public PieChartOptions: Partial<PieChartOptions> | any;
  public yearlyDataOptions: Partial<yearlyDataOptions> | any;
  public sectionDataOptions: Partial<sectionDataOptions> | any;

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService) { }

  listYear: any;

  soyjoy: any;
  ps: any;
  psiw: any;
  newProduct: any;

  headingSoyjoy: any;
  headingPs: any;
  headingPsiw: any;
  headingNewProduct: any;

  configPs = {
    id: 'customPs',
    itemsPerPage: 5,
    currentPage: 1,
  };
  configPsiw = {
    id: 'customPsiw',
    itemsPerPage: 5,
    currentPage: 1,
  };
  configSoyjoy = {
    id: 'customSoyjoy',
    itemsPerPage: 5,
    currentPage: 1,
  };
  configNewProduct = {
    id: 'customNewProduct',
    itemsPerPage: 5,
    currentPage: 1,
  };

  filterPs: any;
  filterPsiw: any;
  filterSoyjoy: any;
  filterNewProduct: any;


  // count by section Chart
  codeSection: any;
  amountSection: any;

  // count by section Chart
  codeStatus: any;
  amountStatus: any;

  // count by section Chart
  codeYear: any;
  amounYear: any;


  ngOnInit() {
    this.spinner.show();
    this.listYear = Array.from({ length: 5 }, (v, k) => k + 2023);

    this.MasterService.getPatternTimeline().subscribe((res: any) => {
      this.headingSoyjoy = res.soyjoy;
      this.headingPs = res.ps;
      this.headingPsiw = res.psiw;
      this.headingNewProduct = res.newProduct;

    })

    this.MasterService.monitoringEvent().subscribe((res: any) => {
      this.soyjoy = res.soyjoy;
      this.soyjoy?.forEach((element: any) => {
        element.index = this.soyjoy.indexOf(element) + 1;
      })
      this.ps = res.ps;


      this.ps?.forEach((element: any) => {
        element.index = this.ps.indexOf(element) + 1;
      })
      this.psiw = res.psiw;
      this.psiw?.forEach((element: any) => {
        element.index = this.psiw.indexOf(element) + 1;
      });
      this.newProduct = res.newProduct;
      this.newProduct?.forEach((element: any) => {
        element.index = this.newProduct.indexOf(element) + 1;
      })
    }, (error) => { }, () => {
      this.spinner.hide();
    })

    this.MasterService.countBySection().subscribe((res: any) => {
      let data = res.result;
      this.codeSection = data.map((item: any) => item.section);
      this.amountSection = data.map((item: any) => item.amount);
      this.SectionChart(this.amountSection, this.codeSection);
    })
    this.MasterService.countByStatus().subscribe((res: any) => {
      this.codeStatus = res?.map((item: any) => item.status);
      this.amountStatus = res?.map((item: any) => item.amount);
      this.StatusChart(this.codeStatus, this.amountStatus);
    })

    this.MasterService.countByYear().subscribe((res: any) => {
      this.codeYear = res.map((item: any) => item.year);
      this.amounYear = res.map((item: any) => item.amount);
      this.YearChart(this.amounYear, this.codeYear);
    })
  }
  SectionChart(amountBySection: any, codeBySection: any) {

    this.sectionDataOptions = {
      series: [
        {
          name: "amount",
          data: amountBySection
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: codeBySection,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    }
  }
  YearChart(amountBySection: any, codeBySection: any) {
    this.yearlyDataOptions = {
      series: [
        {
          name: "amount",
          data: amountBySection
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
          }
        }
      },
      colors: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
      ,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: codeBySection,
        labels: {
          style: {
            colors: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]

            ,
            fontSize: "12px"
          }
        }
      }
    }
  }
  StatusChart(codeByStatus: any, amountByStatus: any) {
    this.PieChartOptions = {
      series: amountByStatus,
      chart: {
        type: "pie",
        height: 350
      },
      colors: ['#03C988', '#FFC436', '#FF0000'],
      labels: codeByStatus,
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

          }
        }
      ]
    }
  }
}
