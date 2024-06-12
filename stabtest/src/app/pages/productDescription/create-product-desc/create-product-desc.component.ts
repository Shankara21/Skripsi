import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-product-desc',
  templateUrl: './create-product-desc.component.html',
  styleUrls: ['./create-product-desc.component.css']
})
export class CreateProductDescComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router) { }
  form!: FormGroup;
  product: any;
  variant: any;
  parameter: any;

  config = {
    id: 'custom',
    itemsPerPage: 20,
    currentPage: 1,
  };

  alert: boolean = false;
  msg: any;
  ngOnInit() {
    this.form = new FormGroup({
      productId: new FormControl(''),
      variantId: new FormControl(''),
    })
    forkJoin(
      this.MasterService.getProduct(),
      this.MasterService.getVariant(),
      this.MasterService.getParameter()
    ).subscribe(([res1, res2, res3]) => {
      this.product = res1;
      this.variant = res2;
      this.parameter = res3;
      this.parameter.forEach((element: any) => {
        element.index = this.parameter.indexOf(element) + 1;
        element.isCheck = false;
      })
    })
  }

  changeValue(event: any) {
    this.config.itemsPerPage = event.target.value;

  }
  updateChecklist(event: any, index: any) {
    this.parameter[index].isCheck = event.target.checked;
  }

  submit() {
    if (this.form.value.productId == '' || this.form.value.variantId == '') {
      this.alert = true;
      this.msg = 'Please fill all field';
      setTimeout(() => {
        this.alert = false;
        this.msg = ''
      }, 3000);
      return;
    }
    let parameters: any = [];
    this.parameter.forEach((element: any) => {
      if (element.isCheck) {
        parameters.push(element.id);
      }
    });
    let data = {
      productId: parseInt(this.form.value.productId),
      variantId: parseInt(this.form.value.variantId),
      parameters
    }
    this.MasterService.createProductDescription(data).subscribe((res: any) => {
      this.Router.navigateByUrl('/master/product-description');
    })
  }

}
