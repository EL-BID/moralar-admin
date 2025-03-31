import { ControlValueAccessor, NgControl } from '@angular/forms';
import { OnDestroy, Input, Optional, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class ControlComponentBaseClass implements ControlValueAccessor, OnDestroy {

  @Input()
  _value: any;

  disabled: boolean;

  onDestroy: Subject<void> = new Subject();

  constructor(
    @Optional() public ngControl: NgControl
  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private onChange(value: any): void { }
  private onTouched(value: any): void { }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this._value = obj;
      this.onChange(obj);
      this.onTouched(obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
