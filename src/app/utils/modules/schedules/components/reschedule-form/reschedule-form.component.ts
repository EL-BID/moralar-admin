import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { SCHEDULE_TYPE_LIST } from 'src/app/utils/interfaces/schedules.interface';

import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { takeUntil, debounceTime } from 'rxjs/operators';
import {
  FormDataModel,
  generateFormData,
} from 'src/app/utils/functions/generate-form-data.function';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import {
  dateAndTimeToString,
  dateToSeconds,
  dateToString,
} from 'src/app/utils/functions/date.function';
import { Enums } from 'src/app/utils/functions/enums.function';
@Component({
  selector: 'app-reschedule-form',
  templateUrl: './reschedule-form.component.html',
  styleUrls: ['./reschedule-form.component.sass'],
})
export class RescheduleFormComponent
  extends FormComponentClass
  implements OnInit
{
  scheduleTypeList: any[] = SCHEDULE_TYPE_LIST;
  dayMin = DateTime.local()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toSeconds();

  formDataModelQuiz: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'title', name: 'Title', searchable: true },
    ],
    page: 1,
    pageSize: 1000,
    search: {
      search: '',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  questionnaires = [];
  showQuiz = false;

  actualScheduleType: number | null = null;
  actualQuiz = {
    open: false,
    value: null,
  };
  
  dataLoaded = false;

  constructor(
    formBuilder: FormBuilder,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    this.form = formBuilder.group({
      date: [null, Validators.required],
      familyId: [null],
      typeSubject: [{ disabled: true, value: null }],
      place: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      description: [null, Validators.required],
      time: [null, Validators.required],
      quiz: [{ disabled: true, value: null }],
    });
    this.form
      .get('typeSubject')
      .valueChanges.subscribe((gettedtypeSubjectName: String) => {
        const typeSubject: number = Enums.getTypeSubjectByName( gettedtypeSubjectName );
        this.actualScheduleType = typeSubject;
        if (typeSubject == 7) {
          this.getQuestionnaires();
          this.showQuiz = true;
        } else {
          this.showQuiz = false;
        }
      });
    this.form
      .get( 'quiz' )
      .valueChanges.subscribe( ( getActualQuiz: object | null ) => {
        if ( getActualQuiz != null && getActualQuiz['id']) {
          this.actualQuiz.value = getActualQuiz['id'];
          this.actualQuiz.open = true;
        }
      } );
  }

  ngOnInit(): void {
    this.form.controls.time.setValue(
      dateAndTimeToString(+this.form.controls.date.value).substr(-5, 5)
    );
    this.form.controls.date.setValue(
      dateToSeconds(dateToString(+this.form.controls.date.value))
    );
  }

  getQuestionnaires(): void {
    if (!this.questionnaires.length)
      this.httpService
        .post(`Quiz/LoadData`, generateFormData(this.formDataModelQuiz))
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          ({ data }: any) => {
            this.questionnaires = data;
            console.log(this.questionnaires);
          },
          ({ message }: any) => this.megaleiosAlertService.error(message)
        );
  }
}
