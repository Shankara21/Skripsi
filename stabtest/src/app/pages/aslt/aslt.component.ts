import { MasterService } from './../../services/master/master.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chart, registerables } from 'chart.js'
import { predictionDataOptions } from 'src/ApexChart';
Chart.register(...registerables)

@Component({
  selector: 'app-aslt',
  templateUrl: './aslt.component.html',
  styleUrls: ['./aslt.component.css']
})
export class AsltComponent implements OnInit {
  public predict30Deg: Partial<predictionDataOptions> | any;
  public predict40Deg: Partial<predictionDataOptions> | any;
  public predict50Deg: Partial<predictionDataOptions> | any;

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService, private elementRef: ElementRef) { }

  listProduct: any;
  listDataStability: any

  isAnimate: boolean = true;
  extendData: boolean = false;

  data: any;
  dataSelected: any;
  listParameterDataSelected: any;
  parameterSelected: any;
  productDescId: number = 0;

  form!: FormGroup;

  list30deg: any;
  list40deg: any;
  list50deg: any;

  raw30Deg: any;
  raw40Deg: any;
  raw50Deg: any;

  dataTable: any;

  firstCalculate: any;
  finalResult: any;
  finalResultPredict: any;

  regressionResult: any;

  // chart (ChartJs)
  finalChart: any;
  first30DegChart: any;
  first40DegChart: any;
  first50DegChart: any;

  rawResult: any;

  logCalculation: any;

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);

    this.form = new FormGroup({
      product: new FormControl(''),
      lotNumber: new FormControl(''),
      parameterId: new FormControl(''),
    })

    this.MasterService.getProduct().subscribe((data: any) => {
      this.listProduct = data;
    }, (error: any) => { }, () => {
      this.spinner.hide();
    })
    const x = [0, 3];

    // Menghitung nilai y berdasarkan persamaan regresi linear
    const regressionData = x.map((xValue) => ({
      x: xValue,
      y: 0.2867 * xValue + 0.6
    }));

    this.first30DegChart = new Chart('regression30Deg', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data',
            data: [

              { x: 0, y: 0.6 },

              { x: 3, y: 1.46 },
            ],
            backgroundColor: 'red',
            borderColor: 'emerald',
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: false,
          },
          {
            label: 'Regresi Linier',
            data: regressionData,
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rose',
            tension: 0.4,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })
    this.first40DegChart = new Chart('regression40Deg', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data',
            data: [

              { x: 0, y: 0.6 },

              { x: 3, y: 1.46 },
            ],
            backgroundColor: 'red',
            borderColor: 'emerald',
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: false,
          },
          {
            label: 'Regresi Linier',
            data: regressionData,
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rose',
            tension: 0.4,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    })
    this.first50DegChart = new Chart('regression50Deg', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data',
            data: [

              { x: 0, y: 0.6 },

              { x: 3, y: 1.46 },
            ],
            backgroundColor: 'red',
            borderColor: 'emerald',
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: false,
          },
          {
            label: 'Regresi Linier',
            data: regressionData,
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rose',
            tension: 0.4,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    })

    this.finalChart = new Chart('finalChart', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data',
            data: [

              { x: 0, y: 0.6 },

              { x: 3, y: 1.46 },
            ],
            backgroundColor: 'red',
            borderColor: 'emerald',
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: false,
          },
          {
            label: 'Regresi Linier',
            data: regressionData,
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rose',
            tension: 0.4,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,

      }
    })

  }

  handleChange() {
    this.form.value.lotNumber = '';
    this.spinner.show();
    this.MasterService.getDataStabilityByProduct(this.form.value.product).subscribe((data: any) => {
      this.listDataStability = data;
      this.listDataStability = this.listDataStability.filter((thing: any, i: any, arr: any) => arr.findIndex((t: any) => t.lotNumber === thing.lotNumber) === i);
    }, (error: any) => { }, () => {
      this.spinner.hide();
    })
  }
  resetData() {
    this.dataSelected = null;
    this.parameterSelected = null;
    this.dataTable = null;
    this.finalResult = null;
    this.finalChart = null;
    this.first30DegChart = null;
    this.first40DegChart = null;
    this.first50DegChart = null;
    this.rawResult = null;
    this.firstCalculate = null;
    this.finalResultPredict = null;
  }
  findData() {
    this.spinner.show();
    // this.resetData();
    this.MasterService.getDataStabilityByLotNumber(this.form.value.lotNumber, this.form.value.product).subscribe((data: any) => {
      this.data = data;
      if (this.data.length == 1) {
        this.dataSelected = this.data[0];
        this.productDescId = this.dataSelected.productDescId;
        this.MasterService.getStandardParameterByProduct(this.dataSelected.productDescId).subscribe((data: any) => {
          this.listParameterDataSelected = data;
        })
      }
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }
  getSelectedData(id: any) {
    this.spinner.show();
    this.parameterSelected = null;
    this.dataSelected = null;
    this.MasterService.showDataStability(id).subscribe((data: any) => {
      this.dataSelected = data;
      this.MasterService.getStandardParameterByProduct(this.dataSelected.productDescId).subscribe((data: any) => {
        this.listParameterDataSelected = data;
      })
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  getParameterDataSelected() {
    this.parameterSelected = null;
    this.finalResult = null;
    this.finalResultPredict = null;
    this.predict30Deg = null;
    this.predict40Deg = null;
    this.predict50Deg = null;
    this.spinner.show();
    this.extendData = false;
    this.MasterService.showParameter(this.form.value.parameterId).subscribe((data: any) => {
      this.parameterSelected = data;
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
    this.spinner.show();
    this.MasterService.getTransactionByDataStabilityPerParameter(this.dataSelected.id, this.form.value.parameterId).subscribe((data: any) => {
      this.list30deg = data.filterData30Deg;
      this.list40deg = data.filterData40Deg;
      this.list50deg = data.filterData50Deg;
      this.dataTable = data.dataTable;
      this.raw30Deg = data.rawData30Deg;
      this.raw40Deg = data.rawData40Deg;
      this.raw50Deg = data.rawData50Deg;
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
    this.spinner.show();
    this.MasterService.showLogCalculation(this.form.value.parameterId, this.dataSelected.id).subscribe((data: any) => {
      this.logCalculation = data;
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  calculateData() {
    this.spinner.show();
    const data = {
      parameter: this.parameterSelected,
      productDescId: this.productDescId,
      data30: this.list30deg,
      data40: this.list40deg,
      data50: this.list50deg,
      raw30: this.raw30Deg,
      raw40: this.raw40Deg,
      raw50: this.raw50Deg,
    }

    this.MasterService.calculateData(data).subscribe((data: any) => {
      this.finalResult = data.finalResult;
      this.finalResultPredict = data.finalResultPredict;
      this.firstCalculate = data.resultArray;
      this.rawResult = data.resultArray;
      this.regressionResult = data.regressionResult;

      let dataCalculation = {
        dataStabilityId: this.dataSelected.id,
        parameterId: this.parameterSelected.id,
        res30: this.finalResult[0].month,
        res40: this.finalResult[1].month,
        res50: this.finalResult[2].month,
      }
      this.MasterService.createLogCalculation(dataCalculation).subscribe((data: any) => {
      })


      if (this.first30DegChart) {
        this.first30DegChart.destroy();
      }
      if (this.finalChart) {
        this.finalChart.destroy();
      }
      if (this.first40DegChart) {
        this.first40DegChart.destroy();
      }
      if (this.first50DegChart) {
        this.first50DegChart.destroy();
      }

      // ChartJs
      this.first30DegChart = new Chart('regression30Deg', {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data',
              data: data?.value30,
              backgroundColor: 'red',
              borderColor: 'emerald',
              pointRadius: 4,
              pointHoverRadius: 6,
              showLine: false,
            },
            {
              label: 'Regresi Linier',
              data: data?.lineRegression30Deg,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rose',
              tension: 0.4,
              showLine: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              text: [
                `f(x) = ${data?.regression30Deg?.slope}x ${data?.regression30Deg?.operation} ${data?.regression30Deg?.intercept} | R² = ${data?.regression30Deg?.score}`,
              ],
              display: true
            }
          }
        }
      })
      this.first40DegChart = new Chart('regression40Deg', {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data',
              data: data?.value40,
              backgroundColor: 'red',
              borderColor: 'emerald',
              pointRadius: 4,
              pointHoverRadius: 6,
              showLine: false,
            },
            {
              label: 'Regresi Linier',
              data: data?.lineRegression40Deg,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rose',
              tension: 0.4,
              showLine: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              text: [
                `f(x) = ${data?.regression40Deg?.slope}x ${data?.regression40Deg?.operation} ${data?.regression40Deg?.intercept} | R² = ${data?.regression40Deg?.score}`,
              ],
              display: true
            }
          }
        }
      })
      this.first50DegChart = new Chart('regression50Deg', {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data',
              data: data?.value50,
              backgroundColor: 'red',
              borderColor: 'emerald',
              pointRadius: 4,
              pointHoverRadius: 6,
              showLine: false,
            },
            {
              label: 'Regresi Linier',
              data: data?.lineRegression50Deg,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rose',
              tension: 0.4,
              showLine: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              text: [
                `f(x) = ${data?.regression50Deg?.slope}x ${data?.regression50Deg?.operation} ${data?.regression50Deg?.intercept} | R² = ${data?.regression50Deg?.score}`,
              ],
              display: true
            }
          }
        }
      })
      this.finalChart = new Chart('finalChart', {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data',
              data: data?.valueResult,
              backgroundColor: 'red',
              borderColor: 'emerald',
              pointRadius: 4,
              pointHoverRadius: 6,
              showLine: false,
            },
            {
              label: 'Regresi Linier',
              data: data?.lineRegressionResult,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'rose',
              tension: 0.4,
              showLine: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              text: [
                `f(x) = ${data?.regressionResult?.slope}x ${data?.regressionResult?.operation} ${data?.regressionResult?.intercept} | R² = ${data?.regressionResult?.score}`,
              ],
              display: true
            }
          }
        }
      })

      // ApexChart
      this.predict30Deg = {
        series: [
          {
            name: "Actual Data",
            data: data?.rawY30
          },
          {
            name: "Predict Data",
            data: data?.predict30
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        title: {
          text: "Prediction 30°C",
          align: "left"
        },
        legend: {
          tooltipHoverFormatter: function (val: any, opts: any) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          labels: {
            trim: false
          },
          categories: data?.schedule30,
          tooltip: {
            enabled: true,
            formatter: undefined,
            offsetY: 0,
            style: {
              fontSize: 12,
              fontFamily: 0,
            },
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            }
          ],
          x: {
            formatter: function (val: any, opts: any) {
              opts.arrCategories = data?.schedule30;
              const arrLabels = opts.arrCategories;
              return arrLabels[opts.dataPointIndex] + ' Month';
            }
          }
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      }
      this.predict40Deg = {
        series: [
          {
            name: "Actual Data",
            data: data?.rawY40
          },
          {
            name: "Predict Data",
            data: data?.predict40
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        title: {
          text: "Prediction 40°C",
          align: "left"
        },
        legend: {
          tooltipHoverFormatter: function (val: any, opts: any) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          labels: {
            trim: false
          },
          categories: data?.schedule40
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            }
          ],
          x: {
            formatter: function (val: any, opts: any) {
              opts.arrCategories = data?.schedule40;
              const arrLabels = opts.arrCategories;
              return arrLabels[opts.dataPointIndex] + ' Month';
            }
          }
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      }
      this.predict50Deg = {
        series: [
          {
            name: "Actual Data",
            data: data?.rawY50
          },
          {
            name: "Predict Data",
            data: data?.predict50
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        title: {
          text: "Prediction 50°C",
          align: "left"
        },
        legend: {
          tooltipHoverFormatter: function (val: any, opts: any) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          tooltip: {
            enabled: true,
            formatter: function (val: any) {
              return val.toFixed(2);
            }
          },
          type: "numeric",
          labels: {
            trim: false,
          },
          categories: data?.schedule50
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            },
            {
              title: {
                formatter: function (val: any) {
                  return val;
                }
              }
            }
          ],
          x: {
            formatter: function (val: any, opts: any) {
              opts.arrCategories = data?.schedule50;
              const arrLabels = opts.arrCategories;
              return arrLabels[opts.dataPointIndex] + ' Month';
            },
          }
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      }

    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

}
