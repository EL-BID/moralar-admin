import { Component, Input } from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../../../services/http/http.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass'],
})
export class CoursesListComponent extends ListContainerClass {
  @Input()
  list;
  formDataModel: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'title', name: 'Title', searchable: true },
      { data: 'startDate', name: 'StartDate', searchable: true },
      { data: 'endDate', name: 'EndDate', searchable: true },
      { data: 'typeStatusCourse', name: 'TypeStatusCourse', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      number: '',
      holderName: '',
      holderCpf: '',
      status: '',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };
  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }
}
