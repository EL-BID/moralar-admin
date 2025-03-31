import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';
import { Blocked } from 'src/app/core/mocks/blocked';

@Component({
  selector: 'app-administrator-list-search',
  templateUrl: './administrator-list-search.component.html',
  styleUrls: ['./administrator-list-search.component.sass']
})
export class AdministratorListSearchComponent extends ListSearchComponentClass {
  blocked = Blocked;

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      blocked: [ '' ],
    });
  }

}
