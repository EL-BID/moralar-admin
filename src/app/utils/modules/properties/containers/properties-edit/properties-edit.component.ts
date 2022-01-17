import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss'],
})
export class PropertiesEditComponent extends OnDestroyClass implements OnInit {
  property!: any;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    const propertyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService
      .get(`ResidencialProperty/Detail/${propertyId}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(({ data }) => (this.property = data));
  }

  editProperty(payload: any): void {
    this.loading = true;
    this.httpService.patch('ResidencialProperty', payload, true).subscribe(
      (_) => this.location.back(),
      (_) => (this.loading = false)
    );
  }
}
