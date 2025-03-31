import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MegaleiosAlert, MegaleiosAlertType } from './megaleios-alert.interface';

@Injectable()
export class MegaleiosAlertService {

  private subject: Subject<MegaleiosAlert> = new Subject<MegaleiosAlert>();

  onAlert(): Observable<MegaleiosAlert> {
    return this.subject.asObservable();
  }

  success(message: string): void {
    this.alert(new MegaleiosAlert({ message, type: MegaleiosAlertType.Success }));
  }

  error(message: string): void {
    this.alert(new MegaleiosAlert({ message, type: MegaleiosAlertType.Error }));
  }

  alert(alert: MegaleiosAlert): void {
    this.subject.next(alert);
  }

}
