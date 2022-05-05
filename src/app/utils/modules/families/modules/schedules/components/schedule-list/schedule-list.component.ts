import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

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
}
