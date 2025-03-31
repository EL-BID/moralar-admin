import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';
import { TIMELINE_STATUS_LIST } from 'src/app/utils/interfaces/timelines.interface';

@Component({
  selector: 'app-displacement-map-list-search',
  templateUrl: './displacement-map-list-search.component.html',
  styleUrls: ['./displacement-map-list-search.component.sass'],
})
export class DisplacementMapListSearchComponent extends ListSearchComponentClass {
  timelineStatusList: any[] = TIMELINE_STATUS_LIST;

  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      number: [''],
      holderName: [''],
      holderCpf: [''],
      status: [''],
    });
  }
}
