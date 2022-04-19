import { Component } from '@angular/core';
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
      { data: 'created', name: 'Created', searchable: false },
      { data: 'name', name: 'Name', searchable: false },
      { data: 'cpf', name: 'Cpf', searchable: false },
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

  uri = 'Family';
}
