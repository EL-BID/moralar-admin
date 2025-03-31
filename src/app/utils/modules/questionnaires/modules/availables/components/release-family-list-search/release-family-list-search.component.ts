import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-release-family-list-search',
  templateUrl: './release-family-list-search.component.html',
  styleUrls: ['./release-family-list-search.component.sass']
})
export class ReleaseFamilyListSearchComponent extends ListSearchComponentClass {

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
