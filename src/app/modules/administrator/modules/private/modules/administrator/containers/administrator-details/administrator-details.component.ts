import { Component, OnInit } from '@angular/core';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { UserService } from 'src/app/utils/services/user/user.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-administrator-details',
  templateUrl: './administrator-details.component.html',
  styleUrls: ['./administrator-details.component.sass']
})
export class AdministratorDetailsComponent extends OnDestroyClass implements OnInit {

  user: any;
  formLoading = false;

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.user
      .pipe(takeUntil(this.onDestroy))
      .subscribe((user: any) => this.user = user);
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.id = this.user.id;
      this.httpService.post('UserAdministrator/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.success);
          this.router.navigate(['/administrador/app']);
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }

}
