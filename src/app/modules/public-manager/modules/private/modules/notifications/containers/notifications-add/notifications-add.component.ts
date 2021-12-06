import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { dateToSeconds } from '../../../../../../../../utils/functions/date.function';

@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.component.html',
  styleUrls: ['./notifications-add.component.sass'],
})
export class NotificationsAddComponent extends OnDestroyClass {
  formLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.startDate = dateToSeconds(value.startDate);
      value.endDate = dateToSeconds(value.endDate);
      this.httpService
        .post('Notification/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.location.back();
            this.formLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
