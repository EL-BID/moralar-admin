import { Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { HttpService } from 'src/app/utils/services/http/http.service';

import { dateAndTimeToString, dateToString } from '../functions/date.function';
import {
  FormDataModel,
  generateFormData,
} from '../functions/generate-form-data.function';
import { OnDestroyClass } from './on-destroy.class';

@Directive()
export abstract class ListContainerClass
  extends OnDestroyClass
  implements OnInit
{
  formDataModel: FormDataModel;
  uri: string;
  uriCustom = '';
  method: string;

  list: any[] = [];
  listSize: number;
  listSizeFiltered: number;
  listSelected: any[] = [];

  @ViewChild('fileRegistration')
  fileRegistration!: ElementRef<HTMLInputElement>;
  loading = false;
  exportingFile = false;
  downloadingRegistrationFile = false;
  sendingRegistrationFile = false;
  listName = 'Relatório';
  uriCustomExampleFile!: string;

  constructor(
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _httpService: HttpService
  ) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.setQueryParams(params);
      this.getList();
    });
  }

  setQueryParams(params: Params) {
    let searchField = Object.keys(params);

    for (const item of searchField) {
      if (item != 'search') {
        if (this.formDataModel.search.hasOwnProperty(item))
          this.formDataModel.search[item] = params[item];

        if (this.formDataModel.hasOwnProperty(item))
          this.formDataModel[item] =
            item === 'page' || item === 'pageSize'
              ? Number(params[item])
              : params[item];

        if (
          this.formDataModel.order.hasOwnProperty(item) &&
          (item === 'column' || item === 'direction')
        )
          this.formDataModel.order[item] = params[item];
      } else {
        this.formDataModel.search[item] = params[item];
      }
    }
  }

  protected updateQueryParams(params: Params): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  handleListSearchChange(value: Params): void {
    this.formDataModel.search = value;
    this.listSelected = [];
    this.updateQueryParams(value);
  }

  handleListOrderChange(value: Params): void {
    this.updateQueryParams(value);
  }

  handleListPageChange(value: any): void {
    this.updateQueryParams(value);
  }

  handleListItemSelected(value: any) {
    let isSelectedIndex = -1;
    this.listSelected.forEach((item: any, index: number) => {
      if (item === value) {
        isSelectedIndex = index;
      }
    });
    isSelectedIndex === -1
      ? this.listSelected.push(value)
      : this.listSelected.splice(isSelectedIndex, 1);
  }

  getList(): void {
    const uri = !this.uriCustom ? `${this.uri}/LoadData` : this.uriCustom;
    this.loading = true;
    if (!this.method) {
      this._httpService
        .post(uri, generateFormData(this.formDataModel))
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.loading = false;
          let i;
          for (i = 0; response.data.length > i; i++) {
            if (response.data[i]?.date) {
              response.data[i].date = dateToString(+response.data[i].date);
            }
            if (response.data[i]?.created) {
              response.data[i].created = dateAndTimeToString(
                +response.data[i].created
              );
            }
          }
          this.list = response.data;
          this.listSize = response.recordsTotal;
          this.listSizeFiltered = response.recordsFiltered;
        });
    } else {
      this._httpService
        .get(uri, generateFormData(this.formDataModel))
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.loading = false;
          let i;
          for (i = 0; response.data.length > i; i++) {
            if (response.data[i]?.date) {
              response.data[i].date = dateToString(+response.data[i].date);
            }
            if (response.data[i]?.created) {
              response.data[i].created = dateAndTimeToString(
                +response.data[i].created
              );
            }
          }
          this.list = response.data;
          this.listSize = response.recordsTotal;
          this.listSizeFiltered = response.recordsFiltered;
        });
    }
  }

  exportToExcel() {
    this.exportingFile = true;
    this.formDataModel.id = this.listSelected.map((el: any) => el.id);
    this._httpService
      .export(`${this.uri}/Export`, generateFormData(this.formDataModel))
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
          });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `Lista de ${this.listName}.xlsx`;
          a.click();
          this.exportingFile = false;
        },
        (_) => (this.exportingFile = false)
      );
  }

  downloadRegistrationFile = () => {
    this.downloadingRegistrationFile = true;
    this._httpService
      .post(
        `${this.uriCustomExampleFile || this.uri}/ExampleFileImport`,
        {},
        {
          responseType: 'blob',
        }
      )
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
          });
          this.downloadingRegistrationFile = false;
          const elRef = document.createElement('a');
          elRef.href = URL.createObjectURL(blob);
          elRef.download = `Modelo de arquivo para cadastro de ${this.listName}.xlsx`;
          elRef.click();
        },
        (_) => (this.downloadingRegistrationFile = false)
      );
  };

  sendRegistrationFile(event: any): void {
    this.sendingRegistrationFile = true;
    const files: any[] = event.target.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('file', files[0]);
      this._httpService
        .post(
          `${this.uriCustomExampleFile || this.uri}/FileImport`,
          formData,
          true
        )
        .subscribe(
          (_) => {
            this.sendingRegistrationFile = false;
            this.fileRegistration.nativeElement.value = '';
            this.getList();
          },
          (_) => {
            this.sendingRegistrationFile = false;
            this.fileRegistration.nativeElement.value = '';
          }
        );
    }
  }
}
