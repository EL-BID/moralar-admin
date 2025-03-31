import {Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-questionnaries-avaliable-list',
  templateUrl: './questionnaries-avaliable-list.component.html',
  styleUrls: ['./questionnaries-avaliable-list.component.sass']
})
export class QuestionnariesAvaliableListComponent extends ListContainerClass {
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
      typeQuiz: 0
    },
    order: {
      column: '0',
      direction: 'asc'
    }
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    //  this._router.navigate([id], { relativeTo: this._activatedRoute.parent });
    this.router.navigate([`/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/questionarios/disponiveis/`, this.listSelected[0].quizFamilyId]);
  }

}
