import {Component, Input} from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../../../../services/http/http.service';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.sass']
})
export class PollsListComponent extends ListContainerClass {
  @Input()
  list;
  formDataModel: FormDataModel = {
    columns: [
      { data: 'title',    name: 'Title',    searchable: true },
      { data: 'date', name: 'Date', searchable: true },
      { data: 'hasAnswered',     name: 'HasAnswered',     searchable: true }
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      number: '',
      holderName: '',
      holderCpf: '',
      status: '',
      typeQuiz: 1
    },
    order: {
      column: '0',
      direction: 'asc'
    }
  };

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }
}
