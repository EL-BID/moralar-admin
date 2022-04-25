import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.sass'],
})
export class MyNotificationsComponent
  extends ListContainerClass
  implements OnInit, OnChanges
{
  @Input() abstract = false;
  @Input() forGestor = true;
  UrlSeelAll = '/gestor-publico/app/my-notifications';

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
      forGestor: true,
      forTTS: false,
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  uri = 'Notification';

  //ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forGestor.firstChange) {
      this.formDataModel.search.forGestor = this.forGestor;
      this.formDataModel.search.forTTS = !this.forGestor;

      this._activatedRoute.queryParams.subscribe((params: Params) => {
        this.setQueryParams(params);
        if (this.forGestor === false) {
          this.UrlSeelAll = '/profissional/app/my-notifications';
        }
        this.getList();
      });
    }
  }

  urlImage(name: string): string {
    return name
      ? `${environment.baseUrl}/content/upload/${name}`
      : 'assets/images/no-image.png';
  }
}
