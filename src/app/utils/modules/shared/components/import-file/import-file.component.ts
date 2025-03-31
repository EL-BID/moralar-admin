import {Component, Input, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from 'src/app/utils/services/http/http.service';
import {ModalImageCropperComponent} from '../modal-image-cropper/modal-image-cropper.component';
import {environment} from 'src/environments/environment';
import {CompressorService} from 'src/app/utils/services/compressor/compressor.service';
import {takeUntil} from 'rxjs/operators';
import {OnDestroyClass} from 'src/app/utils/classes/on-destroy.class';
import {MegaleiosAlertService} from '../../../megaleios-alert/megaleios-alert.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.sass']
})
export class ImportFileComponent extends OnDestroyClass {

  uploadBaseUrl: string = environment.baseUrl;
  uploadIsUploading = false;

  uploadAbstractControl: AbstractControl;

  @Input()
  linkImport: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal,
    private compressorService: CompressorService,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
  }

  handleInputFileChanged(files): void {
    const formData = new FormData();
    formData.append('file', files[0]);
    this.uploadIsUploading = true;
    this.httpService.post('File/Upload', formData)
      .subscribe((response: any) => {
        this.megaleiosAlertService.success(`${response.message}. Upload realizado!`);
        this.importFile();
        setTimeout(() => { this.uploadIsUploading = false; location.reload(); }, 2000);
      }, (response: any) => {
        this.megaleiosAlertService.error(`${response.message}. Falha no upload!`);
        setTimeout(() => { this.uploadIsUploading = false; location.reload(); }, 2000);
      });

  }

  importFile() {
    this.httpService.get(`${this.linkImport}`)
      .subscribe((response: any) => {
        this.megaleiosAlertService.success(`${response.message}. Importação realizada!`);
      }, (response: any) => {
        this.megaleiosAlertService.error(`${response.message}. Falha na importação!`);
        this.uploadIsUploading = false;
      });
  }


}
