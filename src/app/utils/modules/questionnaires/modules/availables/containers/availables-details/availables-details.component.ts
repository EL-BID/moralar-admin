import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../../../services/http/http.service';
import { takeUntil } from 'rxjs/operators';
import { dateToString } from '../../../../../../functions/date.function';
import { OnDestroyClass } from '../../../../../../classes/on-destroy.class';

@Component({
  selector: 'app-availables-details',
  templateUrl: './availables-details.component.html',
  styleUrls: ['./availables-details.component.sass'],
})
export class AvailablesDetailsComponent
  extends OnDestroyClass
  implements OnInit
{
  release: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    super();
  }

  ngOnInit(): void {
    const quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    const familyId = this.activatedRoute.snapshot.paramMap.get('familyId');
    this.httpService
      .get(`QuestionAnswer/GetResponses?quizId=${quizId}&familyId=${familyId}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.release = response.data;
      });
  }
}
