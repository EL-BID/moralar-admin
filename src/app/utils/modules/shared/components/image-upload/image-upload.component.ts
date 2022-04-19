import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ModalImageCropperComponent } from '../modal-image-cropper/modal-image-cropper.component';
import { environment } from 'src/environments/environment';
import { CompressorService } from 'src/app/utils/services/compressor/compressor.service';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent extends OnDestroyClass {
  imageUploadBaseUrl: string = environment.baseUrl;
  imageUploadIsUploading = false;

  @Input()
  imageUploadAbstractControl: AbstractControl;

  @Input()
  imageUploadCropper = false;

  @Input()
  imageUploadCropperAspectRatio = 1;

  @Input()
  changeDetectorRef: ChangeDetectorRef;

  @ViewChild('imageUploadFile', { static: false })
  imageUploadFile: ElementRef<HTMLInputElement>;

  constructor(
    private ngbModal: NgbModal,
    private compressorService: CompressorService,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
  }

  handleInputFileChanged(files: FileList): void {
    const formData = new FormData();
    if (this.imageUploadCropper === true) {
      const modalReference = this.ngbModal.open(ModalImageCropperComponent, {
        size: 'lg',
        centered: true,
      });
      modalReference.componentInstance.modalImageCropperFile = files[0];
      modalReference.componentInstance.modalImageCropperAspectRatio =
        this.imageUploadCropperAspectRatio;
      modalReference.result
        .then((result: any) => {
          if (result) {
            this.compressorService
              .compressFile(result, { maxWidth: 250, maxHeight: 250 })
              .pipe(takeUntil(this.onDestroy))
              .subscribe((file: Blob) => {
                formData.append('file', file);
                this.imageUploadIsUploading = true;
                this.httpService.post('File/Upload', formData).subscribe(
                  ({ data }) => {
                    const newImage = `${this.imageUploadBaseUrl}/content/upload/${data?.fileName}`;
                    this.imageUploadAbstractControl.setValue(newImage);
                    this.imageUploadIsUploading = false;
                    this.changeDetectorRef.detectChanges();
                  },
                  (response: any) => {
                    this.megaleiosAlertService.error(response.message);
                    this.imageUploadIsUploading = false;
                  }
                );
              });
          }
        })
        .catch(() => {});
    } else {
      this.compressorService
        .compressFile(files[0], { maxWidth: 250, maxHeight: 250 })
        .pipe(takeUntil(this.onDestroy))
        .subscribe((file: Blob) => {
          formData.append('file', file);
          this.imageUploadIsUploading = true;
          this.httpService.post('File/Upload', formData).subscribe(
            ({ data }) => {
              const newImage = `${this.imageUploadBaseUrl}/content/upload/${data?.fileName}`;
              this.imageUploadAbstractControl.setValue(newImage);
              this.imageUploadIsUploading = false;
              this.changeDetectorRef.detectChanges();
            },
            (response: any) => {
              this.megaleiosAlertService.error(response.message);
              this.imageUploadIsUploading = false;
            }
          );
        });
    }
  }

  discardImage(): void {
    this.imageUploadFile.nativeElement.value = '';
    this.imageUploadAbstractControl.setValue(null);
  }
}
