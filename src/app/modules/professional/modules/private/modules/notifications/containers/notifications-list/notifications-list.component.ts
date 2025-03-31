import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { HttpService } from 'src/app/utils/services/http/http.service';
import {takeUntil} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MegaleiosAlertService} from '../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';
import {ModalConfirmData} from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import {ModalConfirmComponent} from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.sass']
})
export class NotificationsListComponent extends ListContainerClass {

  formDataModel: FormDataModel = {
    columns: [
      { data: 'title', name: 'Title', searchable: true },
      { data: 'date', name: 'Date', searchable: true },
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

  uri = 'Notification';

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this._router.navigate([this.listSelected[0].id], { relativeTo: this._activatedRoute.parent });
  }

  handleBlockUnblock(value: any): void {

    let modalConfirmData: ModalConfirmData;
    if (value.block) {
      modalConfirmData = {
        title: 'Inativar informativo',
        content: 'Deseja realmente inativar esse informativo?',
        action: 'inativar',
      };
    } else {
      modalConfirmData = {
        title: 'Ativar curso',
        content: 'Deseja realmente ativar esse informativo?',
        action: 'ativar',
      };
    }
    const modalRef = this.ngbModal.open(ModalConfirmComponent, { centered: true });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this._httpService.post('Course/BlockUnblock', value)
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
