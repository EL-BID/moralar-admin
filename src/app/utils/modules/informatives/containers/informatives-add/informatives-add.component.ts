import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { FileService } from 'src/app/utils/services/file/file.service';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-informatives-add',
  templateUrl: './informatives-add.component.html',
  styleUrls: ['./informatives-add.component.sass'],
})
export class InformativesAddComponent extends OnDestroyClass {
  formLoading = false;

  private fileImage: File = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
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

      if ( this.fileImage ) {
        value.image = await this.fileService.uploadFile( this.fileImage );
      }

      this.httpService
        .post('Informative/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
