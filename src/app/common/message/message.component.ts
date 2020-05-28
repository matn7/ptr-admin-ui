import { Component, OnInit, HostBinding } from '@angular/core';
import { AppInternalMessagesService } from '../../service/AppInternalMessagesService';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
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
      this.isMsgFromBackend = isActive.isMsg;
      this.errorMessage = isActive.msg;
    });
  }

  reset() {
    this.isMsgFromBackend = false;
  }

}
