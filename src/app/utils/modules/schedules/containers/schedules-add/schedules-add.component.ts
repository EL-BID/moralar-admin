import { Component } from '@angular/core';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import {
  dateAndTimeToSeconds,
  dateToString,
} from 'src/app/utils/functions/date.function';

@Component({
  selector: 'app-schedules-add',
  templateUrl: './schedules-add.component.html',
  styleUrls: ['./schedules-add.component.sass'],
})
export class SchedulesAddComponent extends OnDestroyClass {
  formLoading = false;

  constructor(
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  handleFormSubmit(value: any): void {
    value.date = dateToString(value.date) + ' ' + value.time;
    value.date = dateAndTimeToSeconds(value.date);
    if (this.formLoading === false) {
      this.formLoading = true;
      this.httpService
        .post('Schedule/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
