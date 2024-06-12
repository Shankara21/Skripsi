import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index-data-stability',
  templateUrl: './index-data-stability.component.html',
  styleUrls: ['./index-data-stability.component.css']
})
export class IndexDataStabilityComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private MasterService: MasterService, private Router: Router, private spinner: NgxSpinnerService) { }

  params = this.Router.url.split('/')[2];



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

  product: any;

  isAnimate: boolean = true;

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    forkJoin([
      this.MasterService.getDataStabilityByProduct(this.params),
      this.MasterService.showProductBySlug(this.params)
    ]).subscribe(([res1, res2]) => {
      this.data = res1;
      this.data.forEach((element: any) => {
        element.index = this.data.indexOf(element) + 1;
        let data = element.description;
        if (element.description.length > 25) {
          element.shortDesc = data.substring(0, 25) + '...';
        } else {
          element.shortDesc = data;
        }
      })
      this.product = res2;
    }, (error) => { }, () => { })
    this.spinner.hide();
  }
  getDataModal(id: any) {
    this.MasterService.showDataStability(id).subscribe((res: any) => {
      this.dataModal = res;
    })
  }

  delete(id: any) {
    this.MasterService.deleteDataStability(id).subscribe((res: any) => {
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
