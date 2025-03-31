import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.sass']
})
export class MatchesListComponent extends ListContainerClass {
  @Input()
  list;
  formDataModel: FormDataModel = {
    columns: [
      { data: 'code', name: 'Title', searchable: true },
      { data: 'typeProperty', name: 'Date', searchable: true },
      { data: 'squareFootage', name: 'HasAnswered', searchable: true },
      { data: 'adress', name: 'Adress', searchable: true }
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

  handleDetails(): void {
    this.router.navigate([`/${this._activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/imoveis/`, this.listSelected[0].id]);
  }

}
