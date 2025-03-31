import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { UserService } from 'src/app/utils/services/user/user.service';

@Component({
  selector: 'app-profiles-add',
  templateUrl: './profiles-add.component.html',
  styleUrls: ['./profiles-add.component.sass'],
})
export class ProfilesAddComponent extends OnDestroyClass {
  formLoading = false;
  sessionUser!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private userService: UserService
  ) {
    super();
    this.userService.user.subscribe((user) => {
      this.sessionUser = user;
    });
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      this.httpService
        .post('Profile/Update', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.formLoading = false;
            this.userService.user = value;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
