import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';
import {
  SCHEDULE_STATUS_LIST,
  SCHEDULE_TYPE_LIST,
} from 'src/app/utils/interfaces/schedules.interface';
import { cloneDeep } from 'lodash';
import {
  dateToSeconds,
  dateToString,
} from 'src/app/utils/functions/date.function';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (
      simpleChanges &&
      simpleChanges.listSearchData &&
      simpleChanges.listSearchData.firstChange
    ) {
      const value = cloneDeep(simpleChanges.listSearchData.currentValue);
      value.startDate = dateToString(value.startDate);
      value.endDate = dateToString(value.endDate);
      this.listSearchForm.patchValue(value);
    }
  }

  ngOnInit(): void {
    this.listSearchForm.valueChanges
      .pipe(
        takeUntil(this.onDestroy),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        const valueFinal = cloneDeep(value);
        value.startDate = dateToSeconds(value.startDate);
        value.endDate = dateToSeconds(value.endDate);
        this.listSearchChange.emit(value);
      });
  }
}
