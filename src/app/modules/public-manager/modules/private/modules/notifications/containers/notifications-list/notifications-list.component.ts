import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MegaleiosAlertService } from '../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';
import { ModalConfirmData } from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import { ModalConfirmComponent } from '../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.sass'],
})
export class NotificationsListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    columns: [
      { data: 'title', name: 'Title', searchable: true },
      { data: 'description', name: 'Description', searchable: true },
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

  uriCustom = 'Notification/LoadDataNotification';

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super(activatedRoute, router, httpService);
  }
}
