import { Router } from '@angular/router';
import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-data-stability',
  templateUrl: './edit-data-stability.component.html',
  styleUrls: ['./edit-data-stability.component.css']
})
export class EditDataStabilityComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router) { }

  paramsName = this.Router.url.split('/')[2];
  paramsId = this.Router.url.split('/')[4];

  product: any;
  productDesc: any;
  sections: any;
  lines: any;
  listUser: any;
  dataStability: any;

  form!: FormGroup;

  alert: boolean = false;
  msg: string = '';

  isAnimate: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
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

    forkJoin([
      this.MasterService.showProductBySlug(this.paramsName),
      this.MasterService.getSection(),
      this.MasterService.getProductDescriptionByProduct(this.paramsName),
      this.MasterService.getLine(),
      this.MasterService.getEmailUser(),
      this.MasterService.showDataStability(this.paramsId),
    ]).subscribe(([res1, res2, res3, res4, res5, res6]) => {
      this.product = res1;
      this.sections = res2;
      this.productDesc = res3;
      this.lines = res4;
      this.listUser = res5;
      this.dataStability = res6;
      this.form.patchValue({
        productDescId: this.dataStability.productDescId,
        lineId: this.dataStability.lineId,
        sectionId: this.dataStability.sectionId,
        description: this.dataStability.description,
        pic: this.dataStability.pic,
        lotNumber: this.dataStability.lotNumber,
        date: this.dataStability.date,
        status: this.dataStability.status,
      })
    });
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
    this.MasterService.updateDataStability(this.paramsId, this.form.value).subscribe((res: any) => {
      this.Router.navigateByUrl(`/data-stability/${this.paramsName}`);
    })
  }

}

