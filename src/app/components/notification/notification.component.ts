import {Component, OnInit} from '@angular/core';
import {NotificationMessage, NotificationService, NotificationMessageLevel} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public messages: NotificationMessage[] = [];// = this.notificationService.observable$();

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.observable$().subscribe(
      q => this.messages.push(q)
    );
  }

  getLevelString(level:NotificationMessageLevel):string{
    return NotificationMessageLevel[level];
  }

}
