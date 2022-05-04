import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
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
      value.holder.birthday = this.formartDateToMilliseconds(
        value.holder.birthday
      );
      value.spouse.birthday = this.formartDateToMilliseconds(
        value.spouse.birthday
      );
      for (let i = 0; value.members.length > i; i++) {
        value.members[i].birthday = this.formartDateToMilliseconds(
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

  formartDateToMilliseconds(dateString: string): number {
    const date = new Date(`${dateString}T00:00:00.000-03:00`);
    const dateMilliseconds = date.getTime();
    return dateMilliseconds / 1000;
  }
}
