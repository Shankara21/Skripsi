import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index-line',
  templateUrl: './index-line.component.html',
  styleUrls: ['./index-line.component.css']
})
export class IndexLineComponent implements OnInit {

  constructor(private MasterService: MasterService, private spinner: NgxSpinnerService) { }
  data: any;
  // Search and pagination
  search: any;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  dataModal: any;

  isAnimate: boolean = true;

  alert: boolean = false;
  msg: any = '';
  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    this.MasterService.getLine().subscribe((res: any) => {
      this.data = res;
      this.data.forEach((element: any) => {
        element.index = this.data.indexOf(element) + 1;
      })
    }, (err) => { }, () => {
      this.spinner.hide();
    } )
  }

  getDataModal(id: any) {
    this.MasterService.showLine(id).subscribe((res: any) => {
      this.dataModal = res;
    })
  }

  delete(id: any) {
    this.MasterService.deleteLine(id).subscribe((res: any) => {
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
