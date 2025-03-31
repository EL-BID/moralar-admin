import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { ControlComponentBaseClass } from '../../classes/control-component-base-class';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-control-radio',
  templateUrl: './control-radio.component.html',
  styleUrls: ['./control-radio.component.sass']
})
export class ControlRadioComponent extends ControlComponentBaseClass implements OnInit {

  @Input()
  value: any;

  faCircle = faCircle;
  faCheckCircle = faCheckCircle;

  constructor(
    public ngControl: NgControl
  ) {
    super(ngControl);
  }

  @HostBinding('tabindex')

  @HostListener('blur')
  touch(): void {
    this.writeValue(this._value);
  }

  @HostListener('keypress', ['$event'])
  @HostListener('click')
  setValue(event?: KeyboardEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (event === undefined || (event && event.code === 'Space')) {
      this.writeValue(this.value);
    }
  }

  ngOnInit(): void {
    this.ngControl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: any) => this._value = value);
  }

}
