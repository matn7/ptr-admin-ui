import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { API_URL, API_VERSION, AUTHENTICATED_USER, TOKEN, TOKEN_EXPIRED } from '../app.constants';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { NotAuthorizedError } from '../common/not-authorized-error';
import { AppError } from '../common/app-error';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {
    return this.http
      .post<any>(`${API_URL}/${API_VERSION}/login`, {
        username,
        password
      })
      .pipe(
        map(data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `${data.token}`);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  isTokenExpired() {
    const token = sessionStorage.getItem(TOKEN_EXPIRED);
    return !(token === null);
  }

  handleError(error: Response) {
    if (error.status === 401) {
      console.log("---> " + error);
      return throwError(
        new NotAuthorizedError(error.status, error["error"])
      );
    }
    return Observable.throw(new AppError(error));
  }
}
