import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from '../../../megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-questionnaires-details',
  templateUrl: './questionnaires-details.component.html',
  styleUrls: ['./questionnaires-details.component.sass']
})
export class QuestionnairesDetailsComponent extends OnDestroyClass implements OnInit {

  questionnaire: any;

  formLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService.get(`Quiz/Detail/${this.activatedRoute.snapshot.paramMap.get('questionnaireId')}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.questionnaire = response.data);
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.id = this.questionnaire.id;
    this.httpService.post('Question/Update', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.message);
          this.router.navigate(['Quiz/LoadData'], { relativeTo: this.activatedRoute });
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }

}
