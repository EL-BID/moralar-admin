import { Component, OnInit } from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

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
      { data: 'date', name: 'Date', searchable: false },
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
      number: '',
      holderName: '',
      holderCpf: '',
      startDate: '',
      endDate: '',
      status: '',
      type: '',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  uri = 'Schedule';
  listName = 'agendamentos';
}
