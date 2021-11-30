import { ChangeDetectorRef, Component } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { sortBy } from 'lodash';
import {
  PROPERTY_REGULARIZATION_LIST,
  PROPERTY_TYPE_GAS_INSTALLATION,
  PROPERTY_TYPE_LIST,
} from 'src/app/utils/interfaces/properties.interface';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.sass'],
})
export class PropertyFormComponent extends FormComponentClass {
  propertyTypeList: any[] = sortBy(PROPERTY_TYPE_LIST, 'name');
  propertyNumberOfFloorsList: any[] = new Array(21);
  propertyLocationFloorList: any[] = new Array(21);
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

  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef
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
      neighborhood: ['', Validators.required],
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
      code: ['', Validators.compose([trimWhiteSpace, Validators.required])],
      photo: this.formBuilder.array([]),
      project: [null, Validators.required],
      residencialPropertyAdress: this.residencialPropertyAdressForm,
      residencialPropertyFeatures: this.residencialPropertyFeaturesForm,
    });
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
    this.photosForm.removeAt(index);
  }
}
