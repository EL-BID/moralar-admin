import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import {dateToSeconds} from '../../../../functions/date.function';
import { FileService } from 'src/app/utils/services/file/file.service';

@Component({
  selector: 'app-videos-add',
  templateUrl: './videos-add.component.html',
  styleUrls: ['./videos-add.component.sass']
})
export class VideosAddComponent extends OnDestroyClass {

  formLoading = false;

  private fileThumbnail: File = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private fileService: FileService
  ) {
    super();
  }

  getThumbnail( event: File ) {
    this.fileThumbnail = event;
  }

  async handleFormSubmit(value: any): Promise<void> {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.startDate = dateToSeconds(value.startDate);
      value.endDate = dateToSeconds(value.endDate);

      if ( this.fileThumbnail ) {
        value.thumbnail = await this.fileService.uploadFile( this.fileThumbnail );
      }

      this.httpService.post('Video/Save', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.message);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }


}
