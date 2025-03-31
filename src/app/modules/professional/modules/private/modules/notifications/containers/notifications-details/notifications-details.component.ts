import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';
import {dateToString} from '../../../../../../../../utils/functions/date.function';

@Component({
  selector: 'app-notifications-details',
  templateUrl: './notifications-details.component.html',
  styleUrls: ['./notifications-details.component.sass']
})
export class NotificationsDetailsComponent extends OnDestroyClass implements OnInit {
  notification: any = { };

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService.get(`Notification/Detail/${this.activatedRoute.snapshot.paramMap.get('notificationId')}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.notification = response.data;
        this.notification.startDate = dateToString(response.data.startDate);
        this.notification.endDate = dateToString(response.data.endDate);
      }) ;
  }

}
