import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { dateToSeconds } from '../../../../../../../../utils/functions/date.function';
import { FileService } from 'src/app/utils/services/file/file.service';

@Component({
  selector: 'app-notifications-add',
  templateUrl: './notifications-add.component.html',
  styleUrls: ['./notifications-add.component.sass'],
})
export class NotificationsAddComponent extends OnDestroyClass {
  formLoading = false;

  private fileImage: File = null;


  constructor(
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private location: Location,
    private fileService: FileService
  ) {
    super();
  }

  getImage( event: File ) {
    this.fileImage = event;
  }

  async handleFormSubmit(value: any): Promise<void> {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.startDate = dateToSeconds(value.startDate);
      value.endDate = dateToSeconds(value.endDate);

      if ( this.fileImage ) {
        value.image = await this.fileService.uploadFile( this.fileImage );
      }
      this.httpService
        .post('Notification/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.location.back();
            this.formLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
