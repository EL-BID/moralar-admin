import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TypeStatusResidencialProperty } from 'src/app/core/mocks/typeStatusResidencialProperty';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';

@Component({
  selector: 'app-property-list-search',
  templateUrl: './property-list-search.component.html',
  styleUrls: ['./property-list-search.component.sass'],
})
export class PropertyListSearchComponent extends ListSearchComponentClass {
  typeStatusResidencialProperty = TypeStatusResidencialProperty;

  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      status: [''],
      typeStatusResidencialProperty: [''],
    });
  }
}
