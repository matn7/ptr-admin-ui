import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user.model';
import { HandleErrorsService } from '../service/handle-errors.service';
import { AppInternalMessagesService } from '../service/AppInternalMessagesService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  user: User[];
  username: string;
  errorMessage: string; 
  returnUrl: string;

  constructor(private userService: UserService, 
    private authService: AuthenticationService,
    private handleErrorService: HandleErrorsService,
    private appInternal: AppInternalMessagesService) { }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/admin";
    this.userService.getAllUsers()
      .subscribe(
        data => {
          console.log("===========>>> " + data);
          this.user = data;
        },
        error => {
          this.errorMessage = this.handleErrorService.displayErrorMessage2(
            error.errorStatus,
            error.errorMsg,
            this.returnUrl
          );

          this.appInternal.messageFromBackend(this.errorMessage);
        }
      )
  }

}
