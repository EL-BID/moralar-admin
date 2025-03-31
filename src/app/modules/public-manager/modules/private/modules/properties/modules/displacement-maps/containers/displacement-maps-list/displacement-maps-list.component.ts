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
      { data: 'date', name: 'Date', searchable: false },
      { data: 'holderName', name: 'HolderName', searchable: false },
      { data: 'holderCpf', name: 'HolderCpf', searchable: false },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      number: '',
      type: 7,
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  // uri = 'Family';
  uri = 'Schedule';
  uriCustomFileExport = 'Schedule/ExportMap';
  listName = 'mapa de deslocamento';
}
