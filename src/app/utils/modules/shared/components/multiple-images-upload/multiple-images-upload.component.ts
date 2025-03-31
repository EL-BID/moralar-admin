import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Output,
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
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiple-images-upload',
  templateUrl: './multiple-images-upload.component.html',
  styleUrls: ['./multiple-images-upload.component.sass'],
})
export class ImagesUploadComponent extends OnDestroyClass {
  imageUploadBaseUrl: string = environment.baseUrl;
  assetsImagePath: string = environment.assetPath;
  imageUploadIsUploading = false;

  @Input()
  imageUploadAbstractControl: AbstractControl;

  @Input()
  imageUploadCropper = false;

  @Input()
  imageUploadCropperAspectRatio = 1;

  @Input()
  changeDetectorRef: ChangeDetectorRef;

  @Input()
  maxWidth: 250;

  @Input()
  maxHeight: 250;

  @Input() index = 0;

  @ViewChild('imageUploadFile', { static: false })
  imageUploadFile: ElementRef<HTMLInputElement>;

  @Output() triggerChildLightbox = new EventEmitter<number>();

  constructor(
    private ngbModal: NgbModal,
    private compressorService: CompressorService,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
  }

  public triggerLightbox( index: number ): void {
    this.triggerChildLightbox.emit(index)
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
              .compressFile(result, {
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
              })
              .pipe(takeUntil(this.onDestroy))
              .subscribe((file: Blob) => {
                formData.append('file', file);
                this.imageUploadIsUploading = true;
                this.httpService.post('File/Upload', formData).subscribe(
                  ({ data }) => {
                    const newImage = `${this.imageUploadBaseUrl}${this.assetsImagePath}${data?.fileName}`;
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
        .catch(() => { });
    } else {
      this.compressorService
        .compressFile(files[0], { maxWidth: 1000, maxHeight: 1000 })
        .pipe(takeUntil(this.onDestroy))
        .subscribe((file: Blob) => {
          formData.append('file', file);
          this.imageUploadIsUploading = true;
          this.httpService.post('File/Upload', formData).subscribe(
            ({ data }) => {
              const newImage = `${this.imageUploadBaseUrl}${this.assetsImagePath}${data?.fileName}`;
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

  public chooseImage(value: any) {
    if (value.imageUrl != null) {
      const url = value.imageUrl;

      return ( !url || url.charAt( url.length - 1 ) === '/' ) ? value.imageBase64 : url;
    } else {
      return value.imageBase64;
    }
  }

  discardImage(): void {
    this.imageUploadFile.nativeElement.value = '';
    this.imageUploadAbstractControl.setValue(null);
  }
}
