import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { formartDateToMillisecondsBRL } from 'src/app/utils/functions/date.function';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-families-add',
  templateUrl: './families-add.component.html',
  styleUrls: ['./families-add.component.sass'],
})
export class FamiliesAddComponent extends OnDestroyClass {
  formLoading = false;

  constructor(
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      if (value.holder.email === '') {
        value.holder.email = null;
      }
      value.holder.birthday = formartDateToMillisecondsBRL(
        value.holder.birthday
      );
      value.spouse.birthday = formartDateToMillisecondsBRL(
        value.spouse.birthday
      );
      for (let i = 0; value.members.length > i; i++) {
        value.members[i].birthday = formartDateToMillisecondsBRL(
          value.members[i].birthday
        );
      }
      this.httpService
        .post('Family/RegisterWeb', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.router.navigate(['Family/LoadData'], {
              relativeTo: this.activatedRoute.parent,
            });
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
