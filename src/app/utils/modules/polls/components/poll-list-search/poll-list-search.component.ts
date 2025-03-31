import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-poll-list-search',
  templateUrl: './poll-list-search.component.html',
  styleUrls: ['./poll-list-search.component.sass']
})
export class PollListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: ['']
    });
  }

}
