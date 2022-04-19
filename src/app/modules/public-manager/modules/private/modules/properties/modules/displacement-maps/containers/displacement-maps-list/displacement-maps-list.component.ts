import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-displacement-maps-list',
  templateUrl: './displacement-maps-list.component.html',
  styleUrls: ['./displacement-maps-list.component.sass'],
})
export class DisplacementMapsListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'number', name: 'Number', searchable: false },
      { data: 'holderName', name: 'HolderName', searchable: false },
      { data: 'holderCpf', name: 'HolderCpf', searchable: false },
      { data: 'status', name: 'Status', searchable: false },
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
      direction: 'asc',
    },
  };

  // uriCustom = 'Family/DisplacementMapAllFamilies';
  uri = 'Family';
  //method = 'get';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this.router.navigate([this.listSelected[0].id], {
      relativeTo: this._activatedRoute,
    });
  }
}
