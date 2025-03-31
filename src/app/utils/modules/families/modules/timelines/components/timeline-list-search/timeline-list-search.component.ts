import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { etapasProcessoReassentamento } from 'src/app/core/mocks/etapasProcessoReassentamento';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';

@Component({
  selector: 'app-timeline-list-search',
  templateUrl: './timeline-list-search.component.html',
  styleUrls: ['./timeline-list-search.component.sass'],
})
export class TimelineListSearchComponent extends ListSearchComponentClass {
  etapasProcessoReassentamento = etapasProcessoReassentamento;

  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      number: [''],
      holderName: [''],
      holderCpf: [''],
      typeSubject: [''],
    });
  }
}
