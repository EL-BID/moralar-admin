import { OnDestroyClass } from './on-destroy.class';
import {
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  Directive,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Directive()
export abstract class FormComponentClass
  extends OnDestroyClass
  implements OnChanges
{
  @Input()
  formData: any;

  @Input()
  formLoading = false;

  form: FormGroup;

  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter();

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (
      simpleChanges &&
      simpleChanges.formData &&
      simpleChanges.formData.firstChange
    ) {
      this.form.patchValue(simpleChanges.formData.currentValue);
    }
  }

  handleSubmit(): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      this.formSubmit.emit(cloneDeep(this.form.value));
    }
  }
}
