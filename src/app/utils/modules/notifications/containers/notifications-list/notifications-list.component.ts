import { Component } from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.sass'],
})
export class NotificationsListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'title', name: 'Title', searchable: true },
      { data: 'description', name: 'Description', searchable: true },
      { data: 'date', name: 'Date', searchable: true },
      { data: 'status', name: 'Status', searchable: true },
    ],
    page: 1,
    pageSize: 5,
    search: {
      search: '',
      //forGestor: true,
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'Notification';
}
