import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-list-search',
  templateUrl: './questionnaire-list-search.component.html',
  styleUrls: ['./questionnaire-list-search.component.sass']
})
export class QuestionnaireListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: ['']
    });
  }

}
