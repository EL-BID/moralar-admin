import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { quizTypeStatus } from 'src/app/core/mocks/quizTypeStatus';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';

@Component({
  selector: 'app-available-list-search',
  templateUrl: './available-list-search.component.html',
  styleUrls: ['./available-list-search.component.sass'],
})
export class AvailableListSearchComponent extends ListSearchComponentClass {
  quizTypeStatus = quizTypeStatus;
  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      number: [''],
      holderName: [''],
      holderCpf: [''],
      title: [''],
      status: [''],
    });
  }
}
