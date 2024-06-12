import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product-desc',
  templateUrl: './edit-product-desc.component.html',
  styleUrls: ['./edit-product-desc.component.css']
})
export class EditProductDescComponent implements OnInit {
  constructor(private MasterService: MasterService, private Router: Router) { }

  params = this.Router.url.split('/')[4];

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

  dataDesc: any;
  dataParameters: any;
  ngOnInit() {
    this.form = new FormGroup({
      productId: new FormControl(''),
      variantId: new FormControl(''),
    })
    forkJoin(
      this.MasterService.getProduct(),
      this.MasterService.getVariant(),
      this.MasterService.getParameter(),
      this.MasterService.showProductDescription(this.params),
      this.MasterService.getStandardParameterByProduct(this.params)
    ).subscribe(([res1, res2, res3, res4, res5]) => {
      this.product = res1;
      this.variant = res2;
      this.parameter = res3;
      this.parameter.forEach((element: any) => {
        element.index = this.parameter.indexOf(element) + 1;
        element.isCheck = false;
      })
      this.dataDesc = res4;
      this.form.patchValue({
        productId: this.dataDesc.Product.id,
        variantId: this.dataDesc.Variant.id
      })
      this.dataParameters = res5;
      this.parameter.forEach((element: any) => {
        element.index = this.parameter.indexOf(element);
        this.dataParameters.forEach((element2: any) => {
          if (element.id == element2.Parameter.id) {
            element.isCheck = true;
          }
        })
      });
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
    this.MasterService.updateProductDescription(this.params, data).subscribe((res: any) => {
      this.Router.navigateByUrl('/master/product-description');
    })
  }

}
