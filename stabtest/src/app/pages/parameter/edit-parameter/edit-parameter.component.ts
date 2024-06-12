import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.css']
})
export class EditParameterComponent implements OnInit {
  constructor(private MasterService: MasterService, private Router: Router) { }
  form!: FormGroup;
  alert: boolean = false;
  msg: any = '';
  params = this.Router.url.split('/')[3];

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
    })
    this.MasterService.showParameter(this.params).subscribe((res: any) => {
      this.form.patchValue({
        name: res.name
      })
    })
  }

  submit() {
    this.MasterService.updateParameter(this.params, this.form.value).subscribe((res: any) => {

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
