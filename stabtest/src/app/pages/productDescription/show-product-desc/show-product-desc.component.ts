import { Router } from '@angular/router';
import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-show-product-desc',
  templateUrl: './show-product-desc.component.html',
  styleUrls: ['./show-product-desc.component.css']
})
export class ShowProductDescComponent implements OnInit {
  constructor(private MasterService: MasterService, private Router: Router) { }

  params = this.Router.url.split('/')[3];

  listStandard: any;
  productDesc: any;
  dataModal: any;

  // Search and pagination
  search: any;

  notAllowed:boolean = false;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  alert: boolean = false;
  msg: any = '';

  form!: FormGroup;

  dataDelete: any;

  ngOnInit() {
    forkJoin(
      this.MasterService.showProductDescription(this.params),
      this.MasterService.getStandardParameterByProduct(this.params)
    ).subscribe(([res1, res2]) => {
      this.productDesc = res1;
      this.listStandard = res2;

      this.listStandard.forEach((element: any) => {
        element.index = this.listStandard.indexOf(element) + 1;
      })
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      standard: new FormControl(''),
      standardType: new FormControl(''),
    });
    if (this.form.value.standard.includes(',')) {
      this.notAllowed = true;
    }
  }
  getDataModal(id: any) {
    this.MasterService.showStandardParameter(id).subscribe((res: any) => {
      this.dataModal = res;
      this.form.patchValue({
        id: this.dataModal.id,
        standard: this.dataModal.standard,
        standardType: this.dataModal.standardType
      });
    })
  }

  updateStandard() {
    this.MasterService.updateStandardParameter(this.form.value.id, this.form.value).subscribe((res: any) => {
      this.ngOnInit();
      this.alert = true;
      this.msg = res.message;

      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    })
  }

  getDataDelete(id: any) {
    this.MasterService.showStandardParameter(id).subscribe((res: any) => {
      this.dataDelete = res;
    })
  }
  deleteData(id:any) {
    this.MasterService.deleteStandardParameter(id).subscribe((res: any) => {
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
