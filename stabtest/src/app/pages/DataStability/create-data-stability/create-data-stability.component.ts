import { Router } from '@angular/router';
import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-data-stability',
  templateUrl: './create-data-stability.component.html',
  styleUrls: ['./create-data-stability.component.css']
})
export class CreateDataStabilityComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router, private spinner: NgxSpinnerService) { }

  params = this.Router.url.split('/')[2];

  product: any;
  productDesc: any;
  sections: any;
  lines: any;
  listUser: any;

  form!: FormGroup;

  alert: boolean = false;
  msg: string = '';

  isAnimate: boolean = true;
  today = moment().format('YYYY-MM-DD');

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    forkJoin([
      this.MasterService.showProductBySlug(this.params),
      this.MasterService.getSection(),
      this.MasterService.getProductDescriptionByProduct(this.params),
      this.MasterService.getLine(),
      this.MasterService.getEmailUser()
    ]).subscribe(([res1, res2, res3, res4, res5]) => {
      this.product = res1;
      this.sections = res2;
      this.productDesc = res3;
      this.lines = res4;
      this.listUser = res5;
    }, (error) => { }, () => {
      this.spinner.hide();
    });

    this.form = new FormGroup({
      productDescId: new FormControl(''),
      lineId: new FormControl(''),
      sectionId: new FormControl(''),
      description: new FormControl(''),
      pic: new FormControl(''),
      lotNumber: new FormControl(''),
      date: new FormControl(''),
      status: new FormControl(''),
    })
  }

  submit() {
    if (this.form.value.productDescId == '' || this.form.value.lineId == '' || this.form.value.sectionId == '' || this.form.value.description == '' || this.form.value.pic == '' || this.form.value.lotNumber == '' || this.form.value.date == '' || this.form.value.status == '') {
      this.alert = true;
      this.msg = 'Please fill all field';
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      return;
    }
    this.MasterService.createDataStability(this.form.value).subscribe((res: any) => {
      this.Router.navigateByUrl(`/data-stability/${this.params}`);

    })
  }

}
