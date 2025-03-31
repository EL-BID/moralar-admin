import { Component } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.sass'],
})
export class PasswordResetFormComponent extends FormComponentClass {
  constructor(formBuilder: FormBuilder) {
    super();
    this.form = formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      typeUserProfile: 3,
    });
  }
}
