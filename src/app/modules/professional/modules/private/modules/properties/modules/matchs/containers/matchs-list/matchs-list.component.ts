import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-matchs-list',
  templateUrl: './matchs-list.component.html',
  styleUrls: ['./matchs-list.component.sass']
})
export class MatchsListComponent extends ListContainerClass {

  formDataModel: FormDataModel = {
    columns: [
      { data: 'holderNumber', name: 'HolderNumber', searchable: true },
      { data: 'holderName', name: 'HolderName', searchable: true },
      { data: 'holderCpf', name: 'HolderCpf', searchable: true },
      { data: 'residencialCode', name: 'ResidencialCode', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      holderNumber: '',
      holderName: '',
      holderCpf: '',
      residencialCode: '',
    },
    order: {
      column: 'holderName',
      direction: 'asc'
    }
  };

  uri = 'PropertiesInterest';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this.router.navigate([this.listSelected[0].residencialPropertyId], { relativeTo: this._activatedRoute });
  }

}
