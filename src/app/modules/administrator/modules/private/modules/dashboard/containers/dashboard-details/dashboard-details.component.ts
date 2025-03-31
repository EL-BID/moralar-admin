import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../../../../../../utils/services/http/http.service';
import {takeUntil} from 'rxjs/operators';
import {OnDestroyClass} from '../../../../../../../../utils/classes/on-destroy.class';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.sass']
})
export class DashboardDetailsComponent extends OnDestroyClass implements OnInit{
  dashboardAdmin: any = {
    registeredFamilies: Number,
    registeredTTS: Number,
    registeredManagers: Number,
    registeredResidencialProperty: Number,
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
super();
  }

  ngOnInit(): void {
    this.httpService.get('DashBoard/RegisteredFamilies')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.dashboardAdmin.registeredFamilies = response.data);

    this.httpService.get('DashBoard/RegisteredTTS')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.dashboardAdmin.registeredTTS = response.data);

    this.httpService.get('DashBoard/RegisteredManagers')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.dashboardAdmin.registeredManagers = response.data);

    this.httpService.get('DashBoard/RegisteredResidencialProperty')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => this.dashboardAdmin.registeredResidencialProperty = response.data);
  }
}
