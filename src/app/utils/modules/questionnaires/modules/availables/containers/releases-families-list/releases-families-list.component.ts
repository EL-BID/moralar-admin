import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-releases-families-list',
  templateUrl: './releases-families-list.component.html',
  styleUrls: ['./releases-families-list.component.sass'],
})
export class ReleasesFamiliesListComponent extends ListContainerClass {
  @Output()
  listFamiliesSelected: EventEmitter<any> = new EventEmitter();

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
      number: '',
      holderName: '',
      holderCpf: '',
      status: '',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'Family';

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

  onChangeListSelected(e) {
    if (this.listSelected.length > 0) {
      this.listSelected.forEach((item: any, index: number) => {
        if (item === e.id) {
          this.listSelected.splice(index, 1);
          this.listFamiliesSelected.emit(this.listSelected);
        } else {
          this.listSelected.push(e.id);
          this.listFamiliesSelected.emit(this.listSelected);
        }
      });
    } else {
      this.listSelected.push(e.id);
      this.listFamiliesSelected.emit(this.listSelected);
    }
  }
}
