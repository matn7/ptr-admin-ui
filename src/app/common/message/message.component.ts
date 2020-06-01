import { Component, OnInit, HostBinding } from '@angular/core';
import { AppInternalMessagesService } from '../../service/AppInternalMessagesService';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  errorMessage: string;

  @HostBinding("class.is-open")
  isMsgFromBackend = false;

  constructor(
    private appInternalMessageService: AppInternalMessagesService
  ) { }

  ngOnInit() {
    this.appInternalMessageService.changeMsgFromBackend.subscribe(isActive => {
      console.log("MessageComponent: " + isActive.isMsg + ", " + isActive.msg);
      this.isMsgFromBackend = isActive.isMsg;
      this.errorMessage = isActive.msg;
      console.log("errorMessage: " + this.errorMessage);
      console.log("isMsgFromBackend: " + this.isMsgFromBackend);
    });
  }

  reset() {
    this.isMsgFromBackend = false;
  }

}
