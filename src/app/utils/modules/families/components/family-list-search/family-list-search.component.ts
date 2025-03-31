import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-family-list-search',
  templateUrl: './family-list-search.component.html',
  styleUrls: ['./family-list-search.component.sass']
})
export class FamilyListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      number: [''],
      holderName: [''],
      holderCpf: ['']
    });
  }

}
