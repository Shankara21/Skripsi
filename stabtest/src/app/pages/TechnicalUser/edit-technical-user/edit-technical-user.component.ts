import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-technical-user',
  templateUrl: './edit-technical-user.component.html',
  styleUrls: ['./edit-technical-user.component.css']
})
export class EditTechnicalUserComponent implements OnInit {

  constructor(private MasterService: MasterService, private Router: Router) { }

  params = this.Router.url.split('/')[3];
  form!: FormGroup;
  sections: any;

  ngOnInit() {
    this.form = new FormGroup({
      sectionId: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
    })

    this.MasterService.showEmailUser(this.params).subscribe((res: any) => {
      this.form.patchValue({
        sectionId: res.sectionId,
        name: res.name,
        email: res.email,
      })
    })

    this.MasterService.getSection().subscribe((res: any) => {
      this.sections = res;
    })
  }

  submit() {
    this.MasterService.updateEmailUser(this.form.value, this.params).subscribe((res: any) => {
      this.Router.navigateByUrl('/master/technical-user')
    })
  }
}
