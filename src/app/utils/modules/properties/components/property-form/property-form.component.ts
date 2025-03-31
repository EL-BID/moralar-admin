import { ChangeDetectorRef, Component, EventEmitter, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { sortBy } from 'lodash';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import {
  PROPERTY_REGULARIZATION_LIST,
  PROPERTY_TYPE_GAS_INSTALLATION,
  PROPERTY_TYPE_LIST,
} from 'src/app/utils/interfaces/properties.interface';
import { environment } from 'src/environments/environment';
import { ImageGalleryComponent } from '../../../shared/components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.sass'],
})
export class PropertyFormComponent extends FormComponentClass {
  imageUploadBaseUrl: string = environment.baseUrl;
  imageUploadIsUploading = false;
  propertyTypeList: any[] = sortBy(PROPERTY_TYPE_LIST, 'name');
  propertyNumberOfFloorsList: any[] = new Array(21);
  propertyRegularizationList: any[] = sortBy(
    PROPERTY_REGULARIZATION_LIST,
    'name'
  );
  propertyGasInstallationList: any[] = sortBy(
    PROPERTY_TYPE_GAS_INSTALLATION,
    'name'
  );

  residencialPropertyAdressForm: FormGroup;
  residencialPropertyFeaturesForm: FormGroup;

  get photosForm(): FormArray {
    return this.form.controls.photo as FormArray;
  }

  @ViewChild( ImageGalleryComponent ) childComponent!: ImageGalleryComponent

  @Output() getFile = new EventEmitter<File>();

  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
    this.residencialPropertyAdressForm = this.formBuilder.group({
      streetAddress: ['', Validators.required],
      number: ['', Validators.required],
      cityName: ['', Validators.required],
      cityId: ['', Validators.required],
      stateName: ['', Validators.required],
      stateUf: ['', Validators.required],
      stateId: ['', Validators.required],
      neighborhood: ['', Validators.required],
      complement: [''],
      location: [''],
      latitude: [-23.5557714],
      longitude: [-46.6395571],
      cep: ['', Validators.required],
    });
    this.residencialPropertyFeaturesForm = this.formBuilder.group({
      propertyValue: ['', Validators.required],
      typeProperty: ['', Validators.required],
      squareFootage: ['', Validators.required],
      condominiumValue: [0],
      iptuValue: [0],
      numberFloors: ['', Validators.required],
      floorLocation: ['', Validators.required],
      hasElavator: ['', Validators.required],
      numberOfBedrooms: ['', Validators.required],
      numberOfBathrooms: ['', Validators.required],
      hasServiceArea: ['', Validators.required],
      hasGarage: ['', Validators.required],
      hasYard: ['', Validators.required],
      hasCistern: ['', Validators.required],
      hasWall: ['', Validators.required],
      hasAccessLadder: ['', Validators.required],
      hasAccessRamp: ['', Validators.required],
      hasAdaptedToPcd: ['', Validators.required],
      propertyRegularization: ['', Validators.required],
      typeGasInstallation: ['', Validators.required],
    });

    this.form = this.formBuilder.group({
      id: [null],
      code: ['', Validators.compose([trimWhiteSpace, Validators.required])],
      photo: this.formBuilder.array([]),
      project: [null, Validators.required],
      description: [null],
      residencialPropertyAdress: this.residencialPropertyAdressForm,
      residencialPropertyFeatures: this.residencialPropertyFeaturesForm,
    });

  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (
      simpleChanges &&
      simpleChanges.formData &&
      simpleChanges.formData.firstChange
    ) {
      const photos = simpleChanges?.formData?.currentValue?.photo as any[];
      if (photos?.length) {
        photos.forEach((photo) => {
          const newControl = new FormControl();
          const descriptionControl = new FormControl();
          descriptionControl.setValue(photo.description);
          newControl.setValue({
            imageUrl: photo.imageUrl,
            imageBase64: null,
            file: null,
            description: descriptionControl,
          });
          this.photosForm.push(newControl);
        });
      }
      const newFormData = {
        ...simpleChanges.formData.currentValue,
        photo: this.photosForm.value,
      };
      this.form.patchValue(newFormData);
    }
  }

  public getFileProject(file: File): void {
    this.getFile.emit(file);
  }

  private convertFileToBase64( file: File ): Promise<string> {
    return new Promise( ( resolve, reject ) => {
      const reader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = () => resolve( reader.result as string );
      reader.onerror = error => reject( error );
    } );
  }

  public triggerChildLightbox( index: any ): void {
    this.childComponent.openLightbox( index );
  }


  private createPhotoFormControl(): FormControl {
    return this.formBuilder.control(null);
  }

  canAddPhotoFormControl(): boolean {
    return this.photosForm.controls.length < 15;
  }

  addPhotoFormControl(): void {
    if (this.canAddPhotoFormControl()) {
      this.photosForm.push(this.createPhotoFormControl());
    }
  }

  removePhotoFormControl(index: number): void {
    this.imageUploadIsUploading = true;

    this.photosForm.removeAt(index);

    setTimeout(() => {
      this.imageUploadIsUploading = false;
    }, 300);
  }

  async handleInputFileChanged( files: FileList ): Promise<void> {
    this.imageUploadIsUploading = true;

    for ( let index = 0; index < files.length; index++ ) {
      const newImage = `${ this.imageUploadBaseUrl }${environment.assetPath}`;

      const newControl = new FormControl();
      this.convertFileToBase64( files [index] ).then( base64 => {
        newControl.setValue( {
          imageUrl: newImage,
          imageBase64: base64,
          file: files[index],
          description: new FormControl(),
        } );
        this.photosForm.push( newControl );
      });
    }


    this.changeDetectorRef.detectChanges();

    setTimeout( () => {
      this.imageUploadIsUploading = false;
    }, 300 );
  }

  private generateUniqueId( fileName ) {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor( Math.random() * 1000 );
    const uniqueId = `${ timestamp }-${ randomNum }`;
    const fileExtension = fileName.split( '.' ).pop();
    return `${ uniqueId }.${ fileExtension }`;
  }
}
