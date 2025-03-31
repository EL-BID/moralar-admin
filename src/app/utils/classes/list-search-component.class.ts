import { OnDestroyClass } from './on-destroy.class';
import {
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  Directive,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DateTime } from 'luxon';

@Directive()
export abstract class ListSearchComponentClass
  extends OnDestroyClass
  implements OnChanges, OnInit
{
  listSearchForm: FormGroup;

  @Input()
  listSearchData: any;

  @Output()
  listSearchChange: EventEmitter<any> = new EventEmitter();

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (
      simpleChanges &&
      simpleChanges.listSearchData &&
      simpleChanges.listSearchData.firstChange
    ) {
      this.listSearchForm.patchValue(this.listSearchData);
    }
  }

  ngOnInit(): void {
    this.listSearchForm.valueChanges
      .pipe(
        takeUntil(this.onDestroy),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value?.startDate)
          value.startDate = DateTime.fromJSDate(value.startDate).toSeconds();
        if (value?.endDate)
          value.endDate = DateTime.fromJSDate(value.endDate)
            .set({ hour: 23, minute: 59 })
            .toSeconds();
        this.listSearchChange.emit(value);
      });
  }
}
