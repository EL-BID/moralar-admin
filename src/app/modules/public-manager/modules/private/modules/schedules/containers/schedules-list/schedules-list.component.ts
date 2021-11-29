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

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.formDataModel.search.search =
        params.search !== undefined
          ? params.search
          : this.formDataModel.search.search;
      this.formDataModel.search.number =
        params.number !== undefined
          ? params.number
          : this.formDataModel.search.number;
      this.formDataModel.search.holderName =
        params.holderName !== undefined
          ? params.holderName
          : this.formDataModel.search.holderName;
      this.formDataModel.search.holderCpf =
        params.holderCpf !== undefined
          ? params.holderCpf
          : this.formDataModel.search.holderCpf;
      this.formDataModel.search.startDate =
        params.startDate !== undefined
          ? parseFloat(params.startDate)
          : DateTime.local()
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .toSeconds();
      this.formDataModel.search.endDate =
        params.endDate !== undefined
          ? parseFloat(params.endDate)
          : DateTime.local()
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .toSeconds() + 86399;
      this.formDataModel.search.status =
        params.status !== undefined
          ? params.status
          : this.formDataModel.search.status;
      this.formDataModel.search.type =
        params.type !== undefined
          ? params.type
          : this.formDataModel.search.type;
      this.formDataModel.order.column =
        params.column !== undefined
          ? params.column
          : this.formDataModel.order.column;
      this.formDataModel.order.direction =
        params.direction !== undefined
          ? params.direction
          : this.formDataModel.order.direction;
      this.formDataModel.page =
        params.page !== undefined
          ? parseFloat(params.page)
          : this.formDataModel.page;
      this.formDataModel.pageSize =
        params.pageSize !== undefined
          ? parseFloat(params.pageSize)
          : this.formDataModel.pageSize;
      this.getList();
    });
  }

  handleDetails(): void {
    this._router.navigate([this.listSelected[0].id], {
      relativeTo: this._activatedRoute.parent,
    });
  }
}
