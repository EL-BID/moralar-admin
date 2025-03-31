import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import {
  isCpfValid,
  trimWhiteSpace,
} from 'src/app/utils/functions/validators.function';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.sass'],
})
export class ProfessionalFormComponent
  extends FormComponentClass
  implements OnInit
{
  constructor(formBuilder: FormBuilder) {
    super();
    this.form = formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      jobPost: [
        null,
        Validators.compose([trimWhiteSpace, Validators.required]),
      ],
      cpf: [null, Validators.compose([Validators.required, isCpfValid])],
      email: [
        null,
        Validators.compose([
          trimWhiteSpace,
          Validators.required,
          Validators.email,
        ]),
      ],
      phone: [null],
      typeProfile: ['TTS'],
    });
  }

  ngOnInit(): void {}
}
