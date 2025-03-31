import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';
import {MegaleiosAlertService} from '../../../megaleios-alert/megaleios-alert.service';
import {dateToSeconds} from '../../../../functions/date.function';
import { FileService } from 'src/app/utils/services/file/file.service';

@Component({
  selector: 'app-videos-details',
  templateUrl: './videos-details.component.html',
  styleUrls: ['./videos-details.component.sass']
})
export class VideosDetailsComponent extends OnDestroyClass implements OnInit {
  formLoading = false;
  video: any = { };

  private fileThumbnail: File = null

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

  ngOnInit(): void {
 //   this.httpService.get(`Video/Detail/${this.activatedRoute.snapshot.paramMap.get('videoId')}`)
 //     .pipe(takeUntil(this.onDestroy))
 //     .subscribe((response: any) => this.video = response.data);
  }

  async handleFormSubmit(value: any): Promise<void> {
    if (this.formLoading === false) {
      this.formLoading = true;

      if ( this.fileThumbnail ) {
        value.thumbnail = await this.fileService.uploadFile( this.fileThumbnail );
      }
      
      this.httpService.post('Video/Edit', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.success);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }


}
