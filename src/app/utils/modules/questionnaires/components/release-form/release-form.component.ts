import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';

import {
  FormDataModel,
  generateFormData,
} from '../../../../functions/generate-form-data.function';
import { HttpService } from '../../../../services/http/http.service';

@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.sass'],
})
export class ReleaseFormComponent extends FormComponentClass implements OnInit {
  listFamilySelected: any;
  listQuiz: any;
  list: any[] = [];
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
      typeQuiz: 0,
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  constructor(
    private httpService: HttpService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected router: Router
  ) {
    super();
    this.form = this.formBuilder.group({
      quizId: [null, Validators.required],
      allFamily: 'false',
      familyId: [''],
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
      this.getListQuiz();
    });
  }
  getList(): void {
    this.httpService
      .post(`Family/LoadData`, generateFormData(this.formDataModel))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.list = response.data;
      });
  }

  public addFamiliesSelected(e) {
    this.form.value.familyId = e;
  }

  getListQuiz(): void {
    this.httpService
      .get(`Quiz/GetByName?active=true`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.listQuiz = response.data;
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
}
