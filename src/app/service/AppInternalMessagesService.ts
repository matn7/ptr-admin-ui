import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppInternalMessagesService {
    isMsgFromBackend: boolean;

    @Output() changeMsgFromBackend: EventEmitter<object> = new EventEmitter();

    messageFromBackend(message) {
        this.isMsgFromBackend = true;
        this.changeMsgFromBackend.emit({
            isMsg: this.isMsgFromBackend,
            msg: message
        });
    }
}