import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import {
  dateAndTimeToSeconds,
  dateToString,
} from 'src/app/utils/functions/date.function';
import { Enums } from 'src/app/utils/functions/enums.function';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { ModalComponent } from 'src/app/utils/modules/shared/components/modal/modal.component';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-schedules-details',
  templateUrl: './schedules-details.component.html',
  styleUrls: ['./schedules-details.component.sass'],
})
export class SchedulesDetailsComponent
  extends OnDestroyClass
  implements OnInit
{
  @ViewChild('reschedule')
  rescheduleTemplateRef: TemplateRef<any>;
  rescheduleNgbModalRef: NgbModalRef;
  rescheduleFormLoading = false;
  finishLoading = false;

  schedule: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService
      .get(
        `Schedule/Detail/${this.activatedRoute.snapshot.paramMap.get(
          'scheduleId'
        )}`
      )
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => (this.schedule = response.data));
  }

  handleReschedule(): void {
    this.rescheduleNgbModalRef = this.ngbModal.open(ModalComponent, {
      size: 'lg',
      centered: true,
    });
    this.rescheduleNgbModalRef.componentInstance.templateRef =
      this.rescheduleTemplateRef;
  }

  handleRescheduleFormSubmit(value: any): void {
    if (this.rescheduleFormLoading === false) {
      this.rescheduleFormLoading = true;
      value.date = dateToString(value.date) + ' ' + value.time;
      value.date = dateAndTimeToSeconds(value.date);
      value.id = this.schedule.id;
      value.typeScheduleStatus = 2;
      this.httpService
        .post('Schedule/ChangeStatus', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.rescheduleNgbModalRef?.close();
            this.schedule.typeScheduleStatus = "Aguardando reagendamento";
            this.rescheduleFormLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.rescheduleFormLoading = false;
          }
        );
    }
  }

  handleChangeStatusSchedule(typeScheduleStatus: number): void {
    if (this.finishLoading === false) {
      this.finishLoading = true;
      const payload = { ...this.schedule, typeScheduleStatus: typeScheduleStatus };
      this.httpService
        .post('Schedule/ChangeStatus', payload)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.schedule.typeScheduleStatus = 
              Enums.getTypeScheduleNameByStatus(typeScheduleStatus);
            this.finishLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.finishLoading = false;
          }
        );
    }
  }

  handleUndo(): void {
    if (this.finishLoading === false) {
      this.finishLoading = true;
      const payload = { ...this.schedule, typeScheduleStatus: 1 };
      this.httpService
        .post('Schedule/ChangeStatus', payload)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.schedule.typeScheduleStatus = "Confirmado";
            this.finishLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.finishLoading = false;
          }
        );
    }
  }
}
