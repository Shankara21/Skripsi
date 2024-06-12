import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-index-product-desc',
  templateUrl: './index-product-desc.component.html',
  styleUrls: ['./index-product-desc.component.css']
})
export class IndexProductDescComponent implements OnInit {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService) { }

  data: any;


  // Search and pagination
  search: any;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  alert: boolean = false;
  msg: any = '';

  dataModal: any;
  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
    }, 2000);
    this.MasterService.getProductDescription().subscribe((res: any) => {
      this.data = res;
      this.data.forEach((element: any) => {
        element.index = this.data.indexOf(element) + 1;
      })
    }, () => { }, () => { this.spinner.hide(); })
  }

  getDataModal(id:any){
    this.MasterService.showProductDescription(id).subscribe((res: any) => {
      this.dataModal = res;
    })
  }

  deleteData(id: any) {
    this.MasterService.deleteProductDescription(id).subscribe((res: any) => {
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
