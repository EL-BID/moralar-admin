import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-property-list-search',
  templateUrl: './property-list-search.component.html',
  styleUrls: ['./property-list-search.component.sass'],
})
export class PropertyListSearchComponent extends ListSearchComponentClass {
  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      status: [''],
      availableForSale: [''],
    });
  }
}
