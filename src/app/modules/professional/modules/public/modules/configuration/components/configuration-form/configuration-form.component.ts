import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.sass']
})
export class ConfigurationFormComponent extends FormComponentClass {

  constructor(
    formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super();
    this.form = formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      logo: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      color: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      institution: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      city: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      country: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      phone: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      timeStart: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      timeEnd: [null, Validators.compose([trimWhiteSpace, Validators.required])]
    });
  }

}
