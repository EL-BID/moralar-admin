import { Component, OnInit } from '@angular/core';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { takeUntil } from 'rxjs/operators';
import {
  dateToSeconds,
  dateToString,
} from 'src/app/utils/functions/date.function';
@Component({
  selector: 'app-families-details',
  templateUrl: './families-details.component.html',
  styleUrls: ['./families-details.component.sass'],
})
export class FamiliesDetailsComponent extends OnDestroyClass implements OnInit {
  family: any;
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
    this.httpService
      .get(
        `Family/Detail/${this.activatedRoute.snapshot.paramMap.get('familyId')}`
      )
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.family = response.data;
        this.family.holder.birthday = dateToString(
          response.data.holder.birthday
        );
        this.family.spouse.birthday = dateToString(
          response.data.spouse.birthday
        );
        for (let i = 0; this.family.members.length > i; i++) {
          this.family.members[i].birthday = dateToString(
            this.family.members[i].birthday
          );
        }
      });
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      if (value.holder.email === '') {
        value.holder.email = null;
      }
      value.id = this.family.id;
      value.holder.birthday = dateToSeconds(value.holder.birthday);
      value.spouse.birthday = dateToSeconds(value.spouse.birthday);
      for (let i = 0; value.members.length > i; i++) {
        value.members[i].birthday = dateToSeconds(value.members[i].birthday);
      }
      this.httpService
        .post('Family/Edit', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.success);
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
