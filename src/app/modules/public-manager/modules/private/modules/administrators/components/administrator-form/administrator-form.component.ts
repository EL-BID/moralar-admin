import {Component, OnInit} from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { FormBuilder, Validators } from '@angular/forms';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../../../../../utils/services/http/http.service";

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.sass']
})
export class AdministratorFormComponent extends FormComponentClass{

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    formBuilder: FormBuilder
  ) {
    super();
    const genericValidator = Validators.compose([trimWhiteSpace, Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
    this.form = formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      email: [null, Validators.compose([trimWhiteSpace, Validators.required, Validators.email])],
      login: [null, genericValidator],
      password: [null, genericValidator],
      passwordConfirm: [null, genericValidator],
      id: [null],
      cpf: [null],
      jobPost: [null],
      phone: [null],
    });
  }

}
