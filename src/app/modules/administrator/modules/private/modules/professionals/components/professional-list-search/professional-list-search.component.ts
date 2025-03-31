import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-professional-list-search',
  templateUrl: './professional-list-search.component.html',
  styleUrls: ['./professional-list-search.component.sass']
})
export class ProfessionalListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: ['']
    });
  }

}
