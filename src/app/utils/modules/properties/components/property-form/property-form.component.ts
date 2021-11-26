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
      streetAddress: [null, Validators.required],
      number: [null, Validators.required],
      cityName: [null, Validators.required],
      cityId: [null, Validators.required],
      stateName: [null, Validators.required],
      stateUf: [null, Validators.required],
      stateId: [null, Validators.required],
      neighborhood: [null, Validators.required],
      complement: [null],
      location: [''],
      latitude: [0],
      longitude: [0],
      cep: [null, Validators.required],
    });
    this.residencialPropertyFeaturesForm = this.formBuilder.group({
      propertyValue: [null, Validators.required],
      typeProperty: [null, Validators.required],
      squareFootage: [null, Validators.required],
      condominiumValue: null,
      iptuValue: null,
      neighborhood: [null, Validators.required],
      numberFloors: [null, Validators.required],
      floorLocation: [null, Validators.required],
      hasElavator: [null, Validators.required],
      numberOfBedrooms: [null, Validators.required],
      numberOfBathrooms: [null, Validators.required],
      hasServiceArea: [null, Validators.required],
      hasGarage: [null, Validators.required],
      hasYard: [null, Validators.required],
      hasCistern: [null, Validators.required],
      hasWall: [null, Validators.required],
      hasAccessLadder: [null, Validators.required],
      hasAccessRamp: [null, Validators.required],
      hasAdaptedToPcd: [null, Validators.required],
      propertyRegularization: [null, Validators.required],
      typeGasInstallation: [null, Validators.required],
    });
    this.form = this.formBuilder.group({
      code: [null, Validators.compose([trimWhiteSpace, Validators.required])],
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
