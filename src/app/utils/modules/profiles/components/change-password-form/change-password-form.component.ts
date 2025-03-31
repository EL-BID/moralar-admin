import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { GENDER_LIST } from '../../../../interfaces/courses.interface';
import { sortBy } from 'lodash';
import { UserService } from '../../../../services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http/http.service';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.sass'],
})
export class ChangePasswordFormComponent
  extends FormComponentClass
  implements OnInit
{
  genderList: any[] = sortBy(GENDER_LIST, 'name');
  numberOfVacanciesList: any[] = new Array(21);
  cpFormLoading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public httpService: HttpService,
    public ngbModal: NgbModal,
    public megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    const genericValidator = Validators.compose([
      trimWhiteSpace,
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]);
    this.form = this.formBuilder.group({
      currentPassword: [
        null,
        Validators.compose([
          trimWhiteSpace,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
      ],
      newPassword: [null, genericValidator],
      confirmPassword: [null, genericValidator],
    });
  }

  ngOnInit(): void {
    // if (this.formData.value.password === null && this.formData) {
    //   this.megaleiosAlertService.error('Problema ao obter dados - /GetInfo(Current password)');
    // }
  }

  ChangePassword() {
    if (
      this.form.controls.newPassword.value ===
      this.form.controls.confirmPassword.value
    ) {
      if (this.cpFormLoading === false) {
        this.cpFormLoading = true;

        this.httpService
          .post('Profile/ChangePassword', this.form.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(
            (response: any) => {
              this.megaleiosAlertService.success(response.message);
              location.reload();
              this.cpFormLoading = false;
            },
            (response: any) => {
              this.megaleiosAlertService.error(response.message);
              this.cpFormLoading = false;
            }
          );
      }
    }
  }
}
