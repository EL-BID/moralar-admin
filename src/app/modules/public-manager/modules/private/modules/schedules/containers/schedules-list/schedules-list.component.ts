import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.sass'],
})
export class SchedulesListComponent
  extends ListContainerClass
  implements OnInit
{
  formDataModel: FormDataModel = {
    columns: [
      { data: 'date', name: 'Date', searchable: true },
      { data: 'typeSubject', name: 'TypeSubject', searchable: true },
      { data: 'place', name: 'Place', searchable: true },
      { data: 'holderNumber', name: 'HolderNumber', searchable: true },
      { data: 'holderName', name: 'HolderName', searchable: true },
      { data: 'holderCpf', name: 'HolderCpf', searchable: true },
      {
        data: 'typeScheduleStatus',
        name: 'TypeScheduleStatus',
        searchable: true,
      },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'Schedule';
  listName = 'agendamentos';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this._router.navigate([this.listSelected[0].id], {
      relativeTo: this._activatedRoute.parent,
    });
  }
}
