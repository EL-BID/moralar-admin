import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { isCpfValid, trimWhiteSpace } from 'src/app/utils/functions/validators.function';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.sass']
})
export class ProfessionalFormComponent extends FormComponentClass implements OnInit {

  phoneMask: string;

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.form = formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      role: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      cpf: [null, Validators.compose([Validators.required, isCpfValid])],
      email: [null, Validators.compose([trimWhiteSpace, Validators.required, Validators.email])],
      phone: [null]
    });
  }

  ngOnInit(): void {
    this.form.controls.phone.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: string) => {
        if (typeof value === 'string') {
          if (value.length === 11) {
            this.phoneMask = '(00) 00000-0000';
          } else {
            this.phoneMask = '(00) 0000-00009';
          }
        }
      });
  }

}
