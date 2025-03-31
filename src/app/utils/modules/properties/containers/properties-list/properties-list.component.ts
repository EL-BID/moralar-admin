import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { UserService } from 'src/app/utils/services/user/user.service';

import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from '../../../shared/components/modal-confirm/modal-confirm.interface';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css'],
})
export class PropertiesListComponent extends ListContainerClass {
  loggedUser!: any;
  uri = 'ResidencialProperty';
  listName = 'imóveis';

  formDataModel: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'code', name: 'Code', searchable: true },
      {
        data: 'residencialPropertyFeatures.typeProperty',
        name: 'TypeProperty',
        searchable: true,
      },
      {
        data: 'residencialPropertyFeatures.propertyValue',
        name: 'PropertyValue',
        searchable: true,
      },
      {
        data: 'residencialPropertyAdress.neighborhood',
        name: 'Neighborhood',
        searchable: true,
      },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

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
    private megaleiosAlertService: MegaleiosAlertService,
    private userService: UserService
  ) {
    super(activatedRoute, router, httpService);
    this.userService.user.subscribe((user) => (this.loggedUser = user));
  }

  handleBlockUnblock(value: any): void {
    let modalConfirmData: ModalConfirmData;
    if (value.block) {
      modalConfirmData = {
        title: 'Inativar imóvel',
        content: 'Deseja realmente inativar esse imóvel?',
        action: 'inativar',
      };
    } else {
      modalConfirmData = {
        title: 'Ativar imóvel',
        content: 'Deseja realmente ativar esse imóvel?',
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
            .post('ResidencialProperty/BlockUnblock', value)
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
                const errorField = (typeof response.messageEx != "undefined")
                 ? response.messageEx : response.message;
                this.megaleiosAlertService.error(errorField);
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
