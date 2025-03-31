import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import {
  SCHEDULE_STATUS_LIST,
  SCHEDULE_TYPE_LIST,
} from 'src/app/utils/interfaces/schedules.interface';

@Component({
  selector: 'app-schedule-list-search',
  templateUrl: './schedule-list-search.component.html',
  styleUrls: ['./schedule-list-search.component.sass'],
})
export class ScheduleListSearchComponent
  extends ListSearchComponentClass
  implements OnChanges, OnInit
{
  scheduleStatusList: any[] = SCHEDULE_STATUS_LIST;
  scheduleTypeList: any[] = SCHEDULE_TYPE_LIST;

  constructor(formBuilder: FormBuilder) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      number: [''],
      holderName: [''],
      holderCpf: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      type: [''],
    });
  }

  public cleanFilters(): void {
    this.listSearchForm.reset();

    this.listSearchForm.get('status').reset('');
    this.listSearchForm.get('type').reset('');
  }

  public anyControlHasValue(): boolean {
    return Object.values( this.listSearchForm.controls ).some( control => control.value );
  }
}
