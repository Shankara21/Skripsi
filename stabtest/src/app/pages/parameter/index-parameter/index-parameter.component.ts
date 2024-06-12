import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index-parameter',
  templateUrl: './index-parameter.component.html',
  styleUrls: ['./index-parameter.component.css']
})
export class IndexParameterComponent implements OnInit {

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

  alert: boolean = false;
  msg: any = '';

  ngOnInit() {
    this.spinner.show();
    this.MasterService.getParameter().subscribe((res: any) => {
      this.data = res;
      this.data.forEach((element: any) => {
        element.index = this.data.indexOf(element) + 1;
      })
    }, (err) => { }, () => {
      this.spinner.hide();
    })
  }

  getDataModal(id: any) {
    this.MasterService.showParameter(id).subscribe((res: any) => {
      this.dataModal = res;
    })
  }

  delete(id: any) {
    this.MasterService.deleteParameter(id).subscribe((res: any) => {
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
