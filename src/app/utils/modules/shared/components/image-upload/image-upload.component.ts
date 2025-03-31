import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ModalImageCropperComponent } from '../modal-image-cropper/modal-image-cropper.component';
import { environment } from 'src/environments/environment';
import { CompressorService } from 'src/app/utils/services/compressor/compressor.service';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';

@Component( {
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: [ './image-upload.component.sass' ],
} )
export class ImageUploadComponent extends OnDestroyClass {
  imageUploadBaseUrl: string = environment.baseUrl;
  assetsImagePath: string = environment.assetPath;
  imageUploadIsUploading = false;

  @Input()
  imageUploadAbstractControl: AbstractControl;

  imageUploadAbstractControlBase64: AbstractControl = new FormControl();

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

  @Output()
  getFile = new EventEmitter<File>();

  @ViewChild( 'imageUploadFile', { static: false } )
  imageUploadFile: ElementRef<HTMLInputElement>;

  constructor(
    private ngbModal: NgbModal,
    private compressorService: CompressorService,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
  }

  async handleInputFileChanged( files: FileList ): Promise<void> {
    this.getFile.emit(files[0])

    const formData = new FormData();
    if ( this.imageUploadCropper === true ) {
      const modalReference = this.ngbModal.open( ModalImageCropperComponent, {
        size: 'lg',
        centered: true,
      } );
      modalReference.componentInstance.modalImageCropperFile = files[ 0 ];
      modalReference.componentInstance.modalImageCropperAspectRatio =
        this.imageUploadCropperAspectRatio;
      modalReference.result
        .then( ( result: any ) => {
          if ( result ) {
            this.compressorService
              .compressFile( result, {
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
              } )
              .pipe( takeUntil( this.onDestroy ) )
              .subscribe( ( file: Blob ) => {
                formData.append( 'file', file );
                this.imageUploadIsUploading = true;
                const newImage = `${ this.imageUploadBaseUrl }${this.assetsImagePath}`;
                this.imageUploadAbstractControl.setValue( newImage );
                this.imageUploadIsUploading = false;
                this.changeDetectorRef.detectChanges();
              },
                ( response: any ) => {
                  this.megaleiosAlertService.error( response.message );
                  this.imageUploadIsUploading = false;
                }
              );
          }
        } )
        .catch( () => { } );
    } else {
      this.compressorService
        .compressFile( files[ 0 ], { maxWidth: 1000, maxHeight: 1000 } )
        .pipe( takeUntil( this.onDestroy ) )
        .subscribe( ( file: Blob ) => {
          formData.append( 'file', file );
          this.imageUploadIsUploading = true;
          const newImage = `${ this.imageUploadBaseUrl }${this.assetsImagePath}`;
          this.imageUploadAbstractControl.setValue( newImage );
          this.imageUploadIsUploading = false;
          this.changeDetectorRef.detectChanges();
        },
          ( response: any ) => {
            this.megaleiosAlertService.error( response.message );
            this.imageUploadIsUploading = false;
          }
        );
    }

    this.showNewFile( files[ 0 ] );
  }
  
  discardImage(): void {
    if (this.imageUploadFile) {
      this.imageUploadFile.nativeElement.value = '';
    }
    this.imageUploadAbstractControl.setValue( null );
    this.imageUploadAbstractControlBase64.setValue( null);
  }

  public showProjectImage(value: string) {
    return ( value.includes( "http" ) ) ? value : this.imageUploadBaseUrl + this.assetsImagePath + value;
  }

  private showNewFile( file: any ): void {
    if ( file && file.size > 0 ) {
      this.convertFileToBase64( file ).then( base64 => {
        this.imageUploadAbstractControlBase64.setValue( base64 );

        this.imageUploadIsUploading = false;
        this.changeDetectorRef.detectChanges();
      } );
    }
  }

  private convertFileToBase64( file: File ): Promise<string> {
    return new Promise( ( resolve, reject ) => {
      const reader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = () => resolve( reader.result as string );
      reader.onerror = error => reject( error );
    } );
  }
}
