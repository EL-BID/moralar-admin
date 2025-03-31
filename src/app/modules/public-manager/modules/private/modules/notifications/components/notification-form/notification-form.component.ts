import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { FormBuilder, Validators } from '@angular/forms';
import {
  FormDataModel,
  generateFormData,
} from '../../../../../../../../utils/functions/generate-form-data.function';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '../../../../../../../../utils/services/http/http.service';
@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.sass'],
})
export class NotificationFormComponent
  extends FormComponentClass
  implements OnInit
{
  @Output()
      getImage: EventEmitter<File> = new EventEmitter();
      
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
    },
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super();
    this.form = this.formBuilder.group({
      familyId: [null],
      allFamily: [false, Validators.required],
      image: [null],
      title: [null, Validators.required],
      description: [null, Validators.required],
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

  public getFileImage( file: File ) {
    this.getImage.emit( file );
  }

  getList(): void {
    this.httpService
      .post(`Family/LoadData`, generateFormData(this.formDataModel))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.list = response.data;
      });
  }
}
