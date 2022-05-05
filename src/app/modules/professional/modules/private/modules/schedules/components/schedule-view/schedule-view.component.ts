import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  SCHEDULE_STATUS_LIST,
  SCHEDULE_TYPE_LIST,
} from '../../../../../../../../utils/interfaces/schedules.interface';
import { sortBy } from 'lodash';
import { dateAndTimeToString } from '../../../../../../../../utils/functions/date.function';
import { ModalConfirmData } from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import { ModalConfirmComponent } from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.component';
import { HttpService } from '../../../../../../../../utils/services/http/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MegaleiosAlertService } from '../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';
@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.sass'],
})
export class ScheduleViewComponent implements OnInit {
  scheduleStatusList: any[] = sortBy(SCHEDULE_STATUS_LIST, 'id');
  scheduleTypeList: any[] = sortBy(SCHEDULE_TYPE_LIST, 'id');
  @Input()
  schedule: any;

  data: any;

  @Output()
  reschedule: EventEmitter<void> = new EventEmitter();
  @Output()
  finish: EventEmitter<void> = new EventEmitter();

  constructor(
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {}

  ngOnInit(): void {
    this.data = dateAndTimeToString(+this.schedule.date);
  }

  chooseProperty(value: any): void {
    value.typeSubject = 4;
    let modalConfirmData: ModalConfirmData;

    modalConfirmData = {
      title: 'Escolha do imóvel',
      content: 'Deseja realmente liberar para escolha do imóvel?',
      action: 'liberar',
    };

    const modalRef = this.ngbModal.open(ModalConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this.httpService.post('Schedule/ChangeSubject', value).subscribe(
            (response: any) => {
              this.megaleiosAlertService.success(response.message);
              location.reload();
            },
            (response: any) => {
              this.megaleiosAlertService.error(response.message);
            }
          );
        }
      })
      .catch(() => {});
  }
}
