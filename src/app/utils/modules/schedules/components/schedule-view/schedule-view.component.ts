import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { sortBy } from 'lodash';
import { dateAndTimeToString } from 'src/app/utils/functions/date.function';
import {
  SCHEDULE_STATUS_LIST,
  SCHEDULE_TYPE_LIST,
} from 'src/app/utils/interfaces/schedules.interface';
import { HttpService } from 'src/app/utils/services/http/http.service';
import Swal from 'sweetalert2';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from '../../../shared/components/modal-confirm/modal-confirm.interface';
import { Enums } from 'src/app/utils/functions/enums.function';

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
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();
  @Output()
  undo: EventEmitter<void> = new EventEmitter();

  finishLoading = false;

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

  confirmEnd(): void {
    Swal.fire({
      text: `Deseja finalizar esse agendamento?`,
      cancelButtonText: 'Não, cancelar',
      confirmButtonText: 'Sim, finalizar',
      showCancelButton: true,
      reverseButtons: true,
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) this.finish.emit();
    });
  }

  confirmCancel(): void {
    Swal.fire( {
      text: `Deseja cancelar esse agendamento?`,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim, cancelar',
      showCancelButton: true,
      reverseButtons: true,
    } ).then( ( { isConfirmed }: any ) => {
      if ( isConfirmed ) this.cancel.emit();
    } );
  }

  confirmUndo(): void {
    Swal.fire({
      text: `Deseja reverter o status?`,
      cancelButtonText: 'Não, cancelar',
      confirmButtonText: 'Sim, reverter',
      showCancelButton: true,
      reverseButtons: true,
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) this.undo.emit();
    });
  }

  getTypeScheduleStatus(value: string): number {
    return Enums.getTypeScheduleStatusByName(value);
  }
}
