import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ModalConfirmData } from '../../../shared/components/modal-confirm/modal-confirm.interface';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.sass'],
})
export class PropertiesListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
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
      direction: 'asc',
    },
  };

  uri = 'ResidencialProperty';

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
                this.megaleiosAlertService.error(response.message);
              }
            );
        }
      })
      .catch(() => {});
  }

  exportToExcel() {
    this._httpService
      .download('ResidencialProperty/Export') // Check this <==
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
          });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Lista de imóveis.xls';
          a.click();
        },
        ({ message }) => {
          this.megaleiosAlertService.error(message);
        }
      );
  }
}
