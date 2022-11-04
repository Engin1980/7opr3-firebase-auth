import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  private readonly subject = new Subject<NotificationMessage>();

  public observable$() {
    return this.subject.asObservable();
  }

  public showError(message: string): void {
    const nm = NotificationMessageFactory.create(NotificationMessageLevel.danger, message);
    this.subject.next(nm);
  }

  public showInfo(message: string): void {
    const nm = NotificationMessageFactory.create(NotificationMessageLevel.info, message);
    this.subject.next(nm);
  }

  public showWarning(message: string): void {
    const nm = NotificationMessageFactory.create(NotificationMessageLevel.warning, message);
    this.subject.next(nm);
  }
}

export enum NotificationMessageLevel {
  info,
  warning,
  danger
}

export interface NotificationMessage {
  level: NotificationMessageLevel;
  message: string;
}

export class NotificationMessageFactory {
  public static create(level: NotificationMessageLevel, message: string): NotificationMessage {
    const ret = {
      level: level,
      message: message
    };
    return ret;
  }
}
