import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-parameter',
  templateUrl: './create-parameter.component.html',
  styleUrls: ['./create-parameter.component.css']
})
export class CreateParameterComponent {
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

    this.MasterService.createParameter(this.form.value).subscribe((res: any) => {

    }, (err: any) => {
      this.alert = true;
      this.msg = err.error.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    }, () => {
      this.Router.navigateByUrl('/master/parameter');
    })
  }

}
