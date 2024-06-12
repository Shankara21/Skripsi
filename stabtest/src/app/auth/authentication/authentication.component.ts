import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  signUp: boolean = false;
  constructor(private AuthService: AuthService, private router: Router) { }

  loginForm!: FormGroup;

  error: boolean = false;
  msg: any = ''
  animationShake: boolean = false

  isShowPassword: boolean = false;

  ngOnInit() {

    this.loginForm = new FormGroup({
      nik: new FormControl('',),
      password: new FormControl('')
    })
  }

  login() {
    this.AuthService.Login(this.loginForm.value).subscribe((res: any) => {
      this.AuthService.SetToken(res.token);
      this.router.navigateByUrl('/home');
    }, (err: any) => {
      this.error = true;
      this.msg = err.error.message;
      this.animationShake = true;
      setTimeout(() => {
        this.error = false;
        this.msg = '';
      }, 3000);
      setTimeout(() => {
        this.animationShake = false;
      }, 300);
    })
  }
}
