import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { ModalConfirmComponent } from 'src/app/utils/modules/shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from 'src/app/utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.sass']
})
export class AdministratorsListComponent extends ListContainerClass {

  formDataModel: FormDataModel = {
    columns: [
      { data: 'name', name: 'Name', searchable: true },
      { data: 'login', name: 'Login', searchable: true },
      { data: 'email', name: 'Email', searchable: true }
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: ''
    },
    order: {
      column: '0',
      direction: 'asc'
    }
  };

  uri = 'UserAdministrator';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this.router.navigate([this.listSelected[0].id], { relativeTo: this.activatedRoute });
  }

  handleBlockUnblock(value: any): void {
    let modalConfirmData: ModalConfirmData;
    if (value.block) {
      modalConfirmData = {
        title: 'Inativar administrador',
        content: 'Deseja realmente inativar esse administrador?',
        action: 'inativar',
      };
    } else {
      modalConfirmData = {
        title: 'Ativar administrador',
        content: 'Deseja realmente ativar esse administrador?',
        action: 'ativar',
      };
    }
    const modalRef = this.ngbModal.open(ModalConfirmComponent, { centered: true });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this._httpService.post('UserAdministrator/BlockUnblock', value)
            .pipe(takeUntil(this.onDestroy))
            .subscribe((response: any) => {
              this.megaleiosAlertService.success(response.message);
              const index = this.list.findIndex((item) => item.id === value.targetId);
              this.list[index].blocked = value.block;
            }, (response: any) => {
              this.megaleiosAlertService.error(response.message);
            });
        }
      })
      .catch(() => { });
  }

}
