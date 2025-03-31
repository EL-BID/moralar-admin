import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from 'src/app/utils/modules/shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from 'src/app/utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.sass'],
})
export class FamiliesListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'number', name: 'Number', searchable: true },
      { data: 'holderName', name: 'HolderName', searchable: true },
      { data: 'holderCpf', name: 'HolderCpf', searchable: true },
      { data: 'email', name: 'Email', searchable: true },
      { data: 'phone', name: 'Phone', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'Family';
  listName = 'famílias';

  public warnings = {
    open: false,
    data: []
  };

  public spinner = {
    open: false,
    message: "Validando o arquivo..."
  }

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
    this._router.navigate([this.listSelected[0].id], {
      relativeTo: this._activatedRoute.parent,
    });
  }

  handleBlockUnblock(value: any): void {
    let modalConfirmData: ModalConfirmData;
    if (value.block) {
      modalConfirmData = {
        title: 'Inativar família',
        content: 'Deseja realmente inativar essa família?',
        action: 'inativar',
      };
    } else {
      modalConfirmData = {
        title: 'Ativar família',
        content: 'Deseja realmente ativar essa família?',
        action: 'ativar',
      };
    }
    const modalRef = this.ngbModal.open(ModalConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this._httpService
            .post('Family/BlockUnblock', value)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(
              (response: any) => {
                this.megaleiosAlertService.success(response.message);
                const index = this.list.findIndex(
                  (item) => item.id === value.targetId
                );
                this.list[index].blocked = value.block;
              },
              (response: any) => {
                this.megaleiosAlertService.error(response.message);
              }
            );
        }
      })
      .catch(() => {});
  }

  public async sendRegistration( event: any ): Promise<void> {
    this.warnings.open = false;

    this.spinner.open = true;
    this.warnings.data = await this.sendRegistrationFile( event );
    setTimeout( () => {
      this.spinner.open = false;
      this.warnings.open = ( this.warnings.data != null );
    }, 200 );
  }
}
