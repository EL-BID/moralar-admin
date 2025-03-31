import {
  ChangeDetectorRef,
  Component,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';

import { HttpService } from '../../../../services/http/http.service';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass'],
})
export class ProfileFormComponent extends FormComponentClass {
  @ViewChild('changePassword')
  cpTemplateRef: TemplateRef<any>;
  cpNgbModalRef: NgbModalRef;
  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public httpService: HttpService,
    public ngbModal: NgbModal,
    public megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    this.form = this.formBuilder.group({
      name: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      email: [
        null,
        Validators.compose([
          trimWhiteSpace,
          Validators.required,
          Validators.email,
        ]),
      ],
      phone: [null],
      cpf: [null],
      jobPost: [
        null,
        Validators.compose([trimWhiteSpace, Validators.required]),
      ],
      password: [null],
      id: [null],
    });
  }

  handleChangePassword(): void {
    this.cpNgbModalRef = this.ngbModal.open(ModalComponent, {
      size: 'lg',
      centered: true,
    });
    this.cpNgbModalRef.componentInstance.templateRef = this.cpTemplateRef;
  }
}
