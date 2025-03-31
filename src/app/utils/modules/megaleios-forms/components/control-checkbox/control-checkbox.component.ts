import { Component, HostBinding, HostListener, Self, Optional, Input, Output, EventEmitter } from '@angular/core';
import { ControlComponentBaseClass } from '../../classes/control-component-base-class';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-control-checkbox',
  templateUrl: './control-checkbox.component.html',
  styleUrls: ['./control-checkbox.component.sass']
})
export class ControlCheckboxComponent extends ControlComponentBaseClass {

  @Input()
  value: boolean;

  @Output()
  changed: EventEmitter<void> = new EventEmitter();

  @HostBinding('tabindex')

  faSquare = faSquare;
  faCheckSquare = faCheckSquare;

  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    super(ngControl);
  }

  @HostListener('blur')
  touch(): void {
    this.writeValue(this._value);
  }

  @HostListener('keypress', ['$event'])
  @HostListener('click')
  toggleValue(event?: KeyboardEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (event === undefined || (event && event.code === 'Space')) {
      if (this.ngControl) {
        this.writeValue(!this.ngControl.value);
      } else {
        this.value = this.value === true ? false : true;
      }
    }
    this.changed.emit();
  }

}
