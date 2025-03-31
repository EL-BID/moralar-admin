import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-timelines-list',
  templateUrl: './timelines-list.component.html',
  styleUrls: ['./timelines-list.component.sass'],
})
export class TimelinesListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'number', name: 'Number', searchable: true },
      { data: 'name', name: 'Name', searchable: true },
      { data: 'cpf', name: 'Cpf', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      typeSubject: '',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  listName = 'linhas do tempo';

  uri = 'Family/TimeLine';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }
}
