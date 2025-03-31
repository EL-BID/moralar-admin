import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { FileService } from 'src/app/utils/services/file/file.service';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-properties-add',
  templateUrl: './properties-add.component.html',
  styleUrls: ['./properties-add.component.sass']
})
export class PropertiesAddComponent {

  formLoading = false;

  private fileProject: File = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private fileService: FileService
  ) {
  }

  async handleFormSubmit(value: any): Promise<void> {
    value.photo = await this.fileService.uploadFiles( value.photo );
    value.project = await this.fileService.uploadProject( value.project, this.fileProject);

    value.photo = value.photo.map(photo => {
      return {
        ...photo,
        description: photo.description.value
      }
    })
    if (this.formLoading === false) {
      this.formLoading = true;
      this.httpService.post('ResidencialProperty/Register', value)
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.message);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }

  public getFileProject(file: File) {
    this.fileProject = file;
  }

}
