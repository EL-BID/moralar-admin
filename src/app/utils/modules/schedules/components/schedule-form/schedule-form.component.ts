import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';
import { SCHEDULE_TYPE_LIST } from 'src/app/utils/interfaces/schedules.interface';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormDataModel,
  generateFormData,
} from 'src/app/utils/functions/generate-form-data.function';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass'],
})
export class ScheduleFormComponent
  extends FormComponentClass
  implements OnInit
{
  dayMin = DateTime.local()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toSeconds();

  scheduleTypeList: any[] = SCHEDULE_TYPE_LIST;
  family: any;
  formDataModel: FormDataModel = {
    columns: [
      { data: 'number', name: 'Number', searchable: true },
      { data: 'holderName', name: 'HolderName', searchable: true },
      { data: 'holderCpf', name: 'SchedulesComponentCpf', searchable: true },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      number: '',
      holderName: '',
      holderCpf: '',
      status: '',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };
  formDataModelQuiz: FormDataModel = {
    columns: [{ data: 'number', name: 'Number', searchable: false }],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      number: '',
      holderName: '',
      holderCpf: '',
      status: '',
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  questionnaires = [];

  list: any[] = [];
  constructor(
    formBuilder: FormBuilder,
    private httpService: HttpService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private megaleiosAlertService: MegaleiosAlertService
  ) {
    super();
    this.form = formBuilder.group({
      date: [null, Validators.required],
      familyId: [null, Validators.required],
      typeSubject: [null, Validators.required],
      place: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      description: [null, Validators.required],
      quiz: [{ disabled: true, value: null }, Validators.required],
      time: [null, Validators.required],
    });
    this.form
      .get('typeSubject')
      .valueChanges.subscribe((typeSubject: number) => {
        if (typeSubject == 7) {
          this.getQuestionnaires();
          this.form.get('quiz').enable();
        } else this.form.get('quiz').disable();
      });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.formDataModel.search.search =
        params.search !== undefined
          ? params.search
          : this.formDataModel.search.search;
      this.formDataModel.search.number =
        params.number !== undefined
          ? params.number
          : this.formDataModel.search.number;
      this.formDataModel.search.holderName =
        params.holderName !== undefined
          ? params.holderName
          : this.formDataModel.search.holderName;
      this.formDataModel.search.holderCpf =
        params.holderCpf !== undefined
          ? params.holderCpf
          : this.formDataModel.search.holderCpf;
      this.formDataModel.search.status =
        params.status !== undefined
          ? params.status
          : this.formDataModel.search.status;
      this.formDataModel.order.column =
        params.column !== undefined
          ? params.column
          : this.formDataModel.order.column;
      this.formDataModel.order.direction =
        params.direction !== undefined
          ? params.direction
          : this.formDataModel.order.direction;
      this.formDataModel.page =
        params.page !== undefined
          ? parseFloat(params.page)
          : this.formDataModel.page;
      this.formDataModel.pageSize =
        params.pageSize !== undefined
          ? parseFloat(params.pageSize)
          : this.formDataModel.pageSize;
      this.getList();
    });
  }

  getFamily(e) {
    this.form.value.familyId = null;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: e,
      queryParamsHandling: 'merge',
    });
  }

  getList(): void {
    this.httpService
      .post(`Family/LoadData`, generateFormData(this.formDataModel))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.list = response.data;
        },
        ({ message }: any) => this.megaleiosAlertService.error(message)
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
          },
          ({ message }: any) => this.megaleiosAlertService.error(message)
        );
  }
}
