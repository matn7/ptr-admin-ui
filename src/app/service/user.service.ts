import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HandleErrorsService } from "./handle-errors.service";
import { User } from "../model/user.model";
import { API_URL, API_VERSION } from '../app.constants';
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(
        private http: HttpClient,
        private handleErrorService: HandleErrorsService
    ) {}

    getUserDetails(username) {
        return this.http
          .get<User>(
            `${API_URL}/${API_VERSION}/${username}`
          )
          .pipe(
            map(data => {
              return data;
            }),
            catchError(this.handleErrorService.handleError)
          );
      }

    getAllUsers() {
        return this.http
          .get<User[]>(
            `${API_URL}/${API_VERSION}/admin/all`
          )
          .pipe(
            map(data => {
              return data;
            }),
            catchError(this.handleErrorService.handleError)
          );
      }
}