import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ControlComponentBaseClass } from '../../classes/control-component-base-class';
import { DateTime } from 'luxon';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-control-date-picker',
  templateUrl: './control-date-picker.component.html',
  styleUrls: ['./control-date-picker.component.sass']
})
export class ControlDatePickerComponent extends ControlComponentBaseClass implements OnInit {

  @Input()
  dayMin: number;

  @Input()
  dayMax: number;

  @Input()
  daysEnabled: number[];

  @Output()
  monthChange: EventEmitter<number> = new EventEmitter();

  dateTime: DateTime;

  days: (null | number)[] = [];

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  ngOnInit(): void {
    if (this.ngControl.value) {
      this.dateTime = DateTime.fromSeconds(this.ngControl.value)
        .set({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
    } else {
      this.dateTime = DateTime.local()
        .set({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    this.init();
  }

  private init(): void {
    this.days = [];
    let firstDayOfWeek = this.dateTime.get('weekday');
    firstDayOfWeek = firstDayOfWeek === 7 ? 0 : firstDayOfWeek;
    for (let i = 0; i < firstDayOfWeek; i++) {
      this.days.push(null);
    }
    for (let i = 0; i < this.dateTime.daysInMonth; i++) {
      const dateTime = DateTime.local().set({
        year: this.dateTime.get('year'),
        month: this.dateTime.get('month'),
        day: i + 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      this.days.push(dateTime.toSeconds());
    }
  }

  previousMonth(): void {
    this.dateTime = this.dateTime.set({
      month: this.dateTime.get('month') - 1
    });
    this.init();
    this.monthChange.emit(this.dateTime.toSeconds());
  }

  nextMonth(): void {
    this.dateTime = this.dateTime.set({
      month: this.dateTime.get('month') + 1
    });
    this.init();
    this.monthChange.emit(this.dateTime.toSeconds());
  }

  getDaySelectedClass(day: number): string {
    if (day !== null && day === this._value) {
      return 'day-selected';
    } else {
      return '';
    }
  }

  isDisabled(day: null | number): boolean {
    let enabled = day !== null ? true : false;
    if (enabled === true && this.dayMin !== undefined) {
      enabled = day >= this.dayMin;
    }
    if (enabled === true && this.dayMax !== undefined) {
      enabled = day <= this.dayMax;
    }
    if (enabled === true && this.daysEnabled !== undefined) {
      const dayFound = this.daysEnabled.find((item: any) => item === day);
      enabled = dayFound !== undefined ? true : false;
    }
    return enabled === false;
  }

}
