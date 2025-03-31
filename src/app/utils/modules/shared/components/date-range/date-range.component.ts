import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.sass'],
})
export class DateRangeComponent implements OnInit {
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  reset(): void {
    this.form.reset();
    this.form.get('startDate').reset('');
    this.form.get('endDate').reset('');
  }
}
