import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { RETURN_URL, TOKEN_EXPIRED, INVALID_CREDENTIALS } from '../app.constants';
import { HandleErrorsService } from '../service/handle-errors.service';
import { AppInternalMessagesService } from '../service/AppInternalMessagesService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;
  invalidLogin = false;
  returnUrl: string;
  expiredToken = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private handleErrorService: HandleErrorsService
  ) { }

  ngOnInit() {
    this.expiredToken = this.authenticationService.isTokenExpired();
    if (this.expiredToken) {
      sessionStorage.getItem(TOKEN_EXPIRED);
    }
    this.returnUrl = "/login";
    this.initForm();
  }

  handleJWTAuthLogin() {
    console.log("handleJWTAuthLogin");
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.authenticationService
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          if (sessionStorage.getItem("returnUrl") != null) {
            this.router.navigate([sessionStorage.getItem("returnUrl")]);
          } else {
            this.router.navigate(["admin"])
          }
          sessionStorage.removeItem(RETURN_URL);
          if (sessionStorage.getItem(TOKEN_EXPIRED)) {
            sessionStorage.removeItem(TOKEN_EXPIRED);
          }
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
          console.log(error);
          this.handleErrorService.displayErrorMessage(
            error.errorStatus,
            error.errorMsg,
            this.returnUrl
          );
        }
      );
  }

  // this.errorMessage = this.handleError.displayErrorMessage(
  //   error.errorStatus,
  //   error.errorMsg,
  //   this.returnUrl
  // );

  // this.appIntentalMessageService.messageFromBackend(this.errorMessage);

  private initForm() {
    const username = this.username;
    const password = this.password;

    this.loginForm = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      password: new FormControl(password, [Validators.required, Validators.minLength(6), Validators.maxLength(60)])
    });
  }

}
