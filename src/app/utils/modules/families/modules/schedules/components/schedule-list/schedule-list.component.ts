import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import Swal from 'sweetalert2';

import {
  SCHEDULE_STATUS_LIST,
  SCHEDULE_TYPE_LIST,
} from '../../../../../../interfaces/schedules.interface';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.sass'],
})
export class ScheduleListComponent extends ListComponentClass {
  scheduleStatusList = SCHEDULE_STATUS_LIST;
  scheduleTypeList = SCHEDULE_TYPE_LIST;
  @Output() finish: EventEmitter<any> = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,

    private router: Router
  ) {
    super();
  }

  handleDetails(id: string): void {
    this.router.navigate([
      `/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/agendamentos`,
      id,
    ]);
  }

  confirmEnd(index: number, schedule: any): void {
    Swal.fire({
      text: `Deseja finalizar esse agendamento?`,
      cancelButtonText: 'Não, cancelar',
      confirmButtonText: 'Sim, finalizar',
      showCancelButton: true,
      reverseButtons: true,
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) this.finish.emit({ index, ...schedule });
    });
  }
}
