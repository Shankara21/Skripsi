import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-technical-user',
  templateUrl: './create-technical-user.component.html',
  styleUrls: ['./create-technical-user.component.css']
})
export class CreateTechnicalUserComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router) { }

  sections: any;

  form!: FormGroup;

  ngOnInit() {
    this.MasterService.getSection().subscribe((res: any) => {
      this.sections = res;
    })
    this.form = new FormGroup({
      sectionId: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
    })
  }

  submit() {
    this.MasterService.createEmailUser(this.form.value).subscribe((res: any) => {
      this.Router.navigateByUrl('/master/technical-user')
    })
  }

}
