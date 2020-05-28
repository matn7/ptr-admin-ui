import { Injectable } from "@angular/core";
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
providedIn: "root"
})
export class HandleErrorsService {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    displayErrorMessage(errorNumber, errorMsg, redirectUrl) {
        console.log("===> " + errorMsg);
        if (errorNumber === 401) {
            return this.handle401Error(redirectUrl, errorMsg);
        }
    }    

    private handle401Error(redirectUrl, errorMsg) {
        const stringifyErrMsg = JSON.stringify(errorMsg);

        const parsedMsg = JSON.parse(stringifyErrMsg);

        console.log("Invalid username or password");
        return parsedMsg.username + " or " + parsedMsg.password;
    }

}