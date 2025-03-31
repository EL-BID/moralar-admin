import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-public-manager-list-search',
  templateUrl: './public-manager-list-search.component.html',
  styleUrls: ['./public-manager-list-search.component.sass']
})
export class PublicManagerListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: ['']
    });
  }

}
