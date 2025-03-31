import { Component, OnInit } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { FormBuilder, Validators } from '@angular/forms';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { MegaleiosAlertService } from '../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.sass'],
})
export class AdministratorFormComponent
  extends FormComponentClass
  implements OnInit
{
  constructor(
    formBuilder: FormBuilder,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    const genericValidator = Validators.compose([
      trimWhiteSpace,
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]);
    this.form = formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      email: [
        null,
        Validators.compose([
          trimWhiteSpace,
          Validators.required,
          Validators.email,
        ]),
      ],
      password: [null, genericValidator],
      passwordConfirm: [null, genericValidator],
      passwordCurrent: [null],
      passwordCurrentWritten: [
        null,
        Validators.compose([
          trimWhiteSpace,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
      ],
      id: [null],
    });
  }

  ngOnInit(): void {
    // if (this.form.value.passwordCurrent === null && this.formData) {
    //   this.megaleiosAlertService.error(
    //     'Problema ao obter dados - /GetInfo(Current password)'
    //   );
    // }
  }
}
