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
  selector: 'app-professionals-list',
  templateUrl: './professionals-list.component.html',
  styleUrls: ['./professionals-list.component.sass'],
})
export class ProfessionalsListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'name', name: 'Name', searchable: true },
      { data: 'jobPost', name: 'JobPost', searchable: true },
      { data: 'cpf', name: 'Cpf', searchable: true },
      { data: 'email', name: 'Email', searchable: true },
      { data: 'phone', name: 'Phone', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      typeProfile: '1',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'Profile/Gestor';
  uriCustomExampleFile = 'Profile/ExampleFile';
  uriCustomFileImport = 'Profile/TTS/FileImport';
  listName = 'profissionais de TTS';

  public warnings = {
    open: false,
    data: []
  }

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
    this._router.navigate([
      '/administrador/app/profissionais-tts',
      this.listSelected[0].id,
    ]);
  }

  handleBlockUnblock(value: any): void {
    let modalConfirmData: ModalConfirmData;
    if (value.block) {
      modalConfirmData = {
        title: 'Inativar profissional de TTS',
        content: 'Deseja realmente inativar esse profissional de TTS?',
        action: 'inativar',
      };
    } else {
      modalConfirmData = {
        title: 'Ativar profissional de TTS',
        content: 'Deseja realmente ativar esse profissional de TTS?',
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
            .post(`${this.uri}/BlockUnblock`, value)
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
