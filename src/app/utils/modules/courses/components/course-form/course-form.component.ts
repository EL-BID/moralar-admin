import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { GENDER_LIST } from '../../../../interfaces/courses.interface';
import { sortBy } from 'lodash';
import { DateTime } from 'luxon';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass'],
})
export class CourseFormComponent extends FormComponentClass {
  genderList: any[] = sortBy(GENDER_LIST, 'name');
  numberOfVacanciesList: any[] = new Array(21);
  listInterval: any[] = new Array();
  dayMin = DateTime.local().toFormat('yyyy-MM-dd');
  checkDateValidator = false;
  checkIntervalValidator = false;

  @Output()
  getImg: EventEmitter<File> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      img: [null],
      startDate: [this.dayMin, Validators.required],
      endDate: [this.dayMin, Validators.required],
      place: [null, Validators.required],
      schedule: [null, Validators.required],
      workLoad: [null, Validators.required],
      description: [null, Validators.required],
      startTargetAudienceAge: [15, Validators.required],
      endTargetAudienceAge: [80, Validators.required],
      typeGenre: [null],
      numberOfVacancies: [null, Validators.required],
    });
    for (let i = 15; i <= 80; i++) {
      this.listInterval.push(i);
    }
  }

  public getFileImg( file: File ) {
    this.getImg.emit( file );
  }

  checkDate(value) {
    this.checkDateValidator = false;
    if (value < this.dayMin || value > '3000-01-01') {
      this.megaleiosAlertService.error('Data com formato inválido');
    } else {
      this.checkDateValidator = true;
    }
  }

  checkIntervalPublicTarget() {
    this.checkIntervalValidator =
      this.form.value.endTargetAudienceAge >=
      this.form.value.startTargetAudienceAge;
  }
}
