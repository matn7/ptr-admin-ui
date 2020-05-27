import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  handleJWTAuthLogin() {
    console.log("handleJWTAuthLogin");
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
  }

  private initForm() {
    const username = this.username;
    const password = this.password;

    this.loginForm = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      password: new FormControl(password, [Validators.required, Validators.minLength(6), Validators.maxLength(60)])
    });
  }

}
