import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { sortBy } from 'lodash';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';

import { GENDER_LIST } from '../../../../interfaces/courses.interface';

@Component({
  selector: 'app-informative-form',
  templateUrl: './informative-form.component.html',
  styleUrls: ['./informative-form.component.sass'],
})
export class InformativeFormComponent extends FormComponentClass {
  genderList: any[] = sortBy(GENDER_LIST, 'name');

  @Output()
          getImage: EventEmitter<File> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super();
    this.form = this.formBuilder.group({
      image: [null, Validators.required],
      description: [
        null,
        Validators.compose([trimWhiteSpace, Validators.required]),
      ],
    });
  }

  public getFileImage( file: File ) {
    this.getImage.emit( file );
  }
}
