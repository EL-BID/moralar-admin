import { Component } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { FormBuilder, Validators } from '@angular/forms';
import { isCpfValid } from 'src/app/utils/functions/validators.function';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.sass'],
})
export class PasswordResetFormComponent extends FormComponentClass {
  constructor(formBuilder: FormBuilder) {
    super();
    this.form = formBuilder.group({
      cpf: [null, Validators.compose([Validators.required, isCpfValid])],
      typeUserProfile: 0,
    });
  }
}
