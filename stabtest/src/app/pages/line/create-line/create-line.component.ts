import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.css']
})
export class CreateLineComponent implements OnInit {

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
    this.MasterService.createLine(this.form.value).subscribe((res: any) => {
    }, (err: any) => {
      this.alert = true;
      this.msg = err.error.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    }, () => {
      this.Router.navigateByUrl('/master/line');
    })
  }

}
