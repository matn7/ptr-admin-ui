import { Injectable } from "@angular/core";
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { throwError } from "rxjs";
import { BadInputError } from '../common/bad-input-error';
import { NotAuthorizedError } from '../common/not-authorized-error';
import { NotFoundError } from '../common/not-found-error';
import { UnsupportedMediaTypeError } from '../common/unsupported-media-type-error';
import { AppError } from '../common/app-error';
import { ServerError } from '../common/server-error';
import { AppInternalMessagesService } from './AppInternalMessagesService';

@Injectable({
providedIn: "root"
})
export class HandleErrorsService {
  errorMessage: string;

    constructor(
        private router: Router,
        private appIntentalMessageService: AppInternalMessagesService
    ) {}

    displayErrorMessage2(errorNumber, errorMsg, redirectUrl) {
      console.log("===> " + errorMsg);
      console.log("===> " + errorNumber);
      if (errorNumber === 401) {
          return this.errorMessage = this.handle401Error(redirectUrl, errorMsg);
      } else {
        return this.errorMessage = "Unknown error";
      }
      // this.appIntentalMessageService.messageFromBackend(this.errorMessage);
  } 

    displayErrorMessage(errorNumber, errorMsg, redirectUrl) {
        console.log("===> " + errorMsg);
        console.log("===> " + errorNumber);
        if (errorNumber === 401) {
            this.errorMessage = this.handle401Error(redirectUrl, errorMsg);
        } else {
          this.errorMessage = "Unknown error";
        }
        this.appIntentalMessageService.messageFromBackend(this.errorMessage);
    } 
    
    handleError(error: Response) {
        if (error.status === 400) {
          return throwError(new BadInputError(error.status, error["error"]));
        }
        if (error.status === 401) {
          return throwError(
            new NotAuthorizedError(error.status, error["error"])
          );
        }
        if (error.status === 403) {
          return throwError(new NotAuthorizedError(error.status, error["error"]));
        }
        if (error.status === 404) {
          return throwError(new NotFoundError(error.status, error["error"]));
        }
        if (error.status === 415) {
          return throwError(
            new UnsupportedMediaTypeError(error.status, error["error"])
          );
        }
        if (error.status === 500) {
          return throwError(
            new ServerError(error.status, error["error"])
          );
        }
        return throwError(new AppError(error));
      }

    private handle401Error(redirectUrl, errorMsg) {
        const stringifyErrMsg = JSON.stringify(errorMsg);

        const parsedMsg = JSON.parse(stringifyErrMsg);

        console.log("Invalid username or password");
        return parsedMsg.username + " or " + parsedMsg.password;
    }

}