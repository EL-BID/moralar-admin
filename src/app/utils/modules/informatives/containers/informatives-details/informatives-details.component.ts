import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';
import {dateToString} from '../../../../functions/date.function';
import {GENDER_LIST} from '../../../../interfaces/courses.interface';

@Component({
  selector: 'app-informatives-details',
  templateUrl: './informatives-details.component.html',
  styleUrls: ['./informatives-details.component.sass']
})
export class InformativesDetailsComponent extends OnDestroyClass implements OnInit {
  genderList: any[] = GENDER_LIST;
  informative: any = { };

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService.get(`Course/Detail/${this.activatedRoute.snapshot.paramMap.get('informativeId')}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.informative = response.data;
        this.informative.startDate = dateToString(response.data.startDate);
        this.informative.endDate = dateToString(response.data.endDate);
      }) ;
  }

}
