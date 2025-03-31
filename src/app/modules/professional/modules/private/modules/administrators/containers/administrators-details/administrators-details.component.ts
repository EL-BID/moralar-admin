import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';

@Component({
  selector: 'app-administrators-details',
  templateUrl: './administrators-details.component.html',
  styleUrls: ['./administrators-details.component.sass']
})
export class AdministratorsDetailsComponent extends OnDestroyClass implements OnInit {

  administrator: any;
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
    this.httpService.get('UserAdministrator/Detail/' + this.activatedRoute.snapshot.paramMap.get('administratorId'))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.administrator = response.data);
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      value.id = this.administrator.id;
      this.httpService.post('UserAdministrator/Register', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.megaleiosAlertService.success(response.message);
          this.router.navigate(['/administrador/app/administradores']);
        }, (response: any) => {
          this.megaleiosAlertService.error(response.message);
          this.formLoading = false;
        });
    }
  }

}
