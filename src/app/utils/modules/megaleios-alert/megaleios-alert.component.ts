import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { MegaleiosAlertService } from './megaleios-alert.service';
import { MegaleiosAlert, MegaleiosAlertType } from './megaleios-alert.interface';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-megaleios-alert',
  templateUrl: './megaleios-alert.component.html',
  styleUrls: ['./megaleios-alert.component.sass']
})
export class MegaleiosAlertComponent implements OnInit, OnDestroy {

  faCheck = faCheck;
  faTimes = faTimes;

  alert: MegaleiosAlert | null = null;
  alertSubscription: Subscription;
  alertInterval: any;

  onDestroy: Subject<void> = new Subject();

  constructor(
    private alertsService: MegaleiosAlertService
  ) { }

  ngOnInit(): void {
    this.alertsService.onAlert()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(alert => {
        if (this.alertInterval) {
          this.alert = null;
          clearTimeout(this.alertInterval);
        }
        this.alert = alert;
        this.alertInterval = setTimeout(() => {
          this.alert = null;
        }, 3000);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  cssClass(type: MegaleiosAlertType): string {
    switch (type) {
      case MegaleiosAlertType.Success:
        return 'megaleios-alert-success';
      case MegaleiosAlertType.Error:
        return 'megaleios-alert-danger';
    }
  }

}
