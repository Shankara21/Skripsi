import { Router } from '@angular/router';
import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router, private spinner: NgxSpinnerService) { }

  data: any;

  timelines: any;
  temp30: any;
  temp40: any;
  temp50: any;
  product: any;


  // Search and pagination
  search: any;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  // ModalDelete
  productModal: any;

  // Alert
  alert: boolean = false;
  msg: any;

  ngOnInit() {
    this.spinner.show();
    this.MasterService.getProduct().subscribe((res: any) => {
      this.data = res;
      this.data.forEach((element: any) => {
        element.index = this.data.indexOf(element) + 1;
      })
    }, (err) => { }, () => {
      this.spinner.hide();
    });
  }

  hasMatchingSchedule(timelineId: number, data: []): boolean {
    return data.some((schedule: any) => schedule.timelineId === timelineId);
  }

  dataModal(id: any) {
    let tempData: any;
    forkJoin(
      this.MasterService.getTimeline(),
      this.MasterService.getByProduct(id),
      this.MasterService.showProduct(id)
    ).subscribe(([res1, res2, res3]) => {
      this.timelines = res1;
      tempData = res2;
      this.temp30 = tempData.temp.temp30;
      this.temp40 = tempData.temp.temp40;
      this.temp50 = tempData.temp.temp50;
      this.product = res3;
    })
  }

  modalDelete(id: any) {
    this.MasterService.showProduct(id).subscribe((res: any) => {
      this.productModal = res;
    })
  }

  deleteProduct(id: any) {
    this.MasterService.deleteProduct(id).subscribe((res: any) => {
      this.ngOnInit();
      this.alert = true;
      this.msg = res.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    })
  }

}
