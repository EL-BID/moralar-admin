import { Component, Input } from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.sass'],
})
export class MyNotificationsComponent extends ListContainerClass {
  @Input() abstract = false;
  formDataModel: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'title', name: 'Title', searchable: true },
      { data: 'description', name: 'Description', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      //forGestor: true,
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  uri = 'Notification';

  urlImage(name: string): string {
    return `${environment.baseUrl}/content/upload/${name}`;
  }
}
