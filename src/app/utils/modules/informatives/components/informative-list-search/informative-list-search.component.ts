import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-informative-list-search',
  templateUrl: './informative-list-search.component.html',
  styleUrls: ['./informative-list-search.component.sass']
})
export class InformativeListSearchComponent extends ListSearchComponentClass {

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
