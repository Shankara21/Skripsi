import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-variant',
  templateUrl: './create-variant.component.html',
  styleUrls: ['./create-variant.component.css']
})
export class CreateVariantComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router) { }

  form!: FormGroup;
  alert: boolean = false;
  msg: any = '';

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
    })
  }

  submit() {

    if (this.form.value.name == '') {
      this.alert = true;
      this.msg = 'Please fill all field!';
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      return;
    }

    this.MasterService.createVariant(this.form.value).subscribe((res: any) => {

    }, (err: any) => {
      this.alert = true;
      this.msg = err.error.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    }, () => {
      this.Router.navigateByUrl('/master/variant');
    })
  }

}
