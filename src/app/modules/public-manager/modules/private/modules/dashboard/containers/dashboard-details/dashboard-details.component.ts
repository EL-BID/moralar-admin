import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../../../../../../utils/services/http/http.service';
import {takeUntil} from 'rxjs/operators';
import {OnDestroyClass} from '../../../../../../../../utils/classes/on-destroy.class';
import {MegaleiosAlertService} from '../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.sass']
})
export class DashboardDetailsComponent extends OnDestroyClass implements OnInit{
  dashboardManager: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService.get('ResidencialProperty/Dashboard')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.dashboardManager = response.data;
        // this.megaleiosAlertService.success(response.message);
      }, (response: any) => {
        this.megaleiosAlertService.error(response.message);
      });
    }
}
