import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notification-list-search',
  templateUrl: './notification-list-search.component.html',
  styleUrls: ['./notification-list-search.component.sass']
})
export class NotificationListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      startDate: [''],
      endDate: [''],
    });
  }

}
