import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.sass'],
})
export class PropertiesDetailsComponent
  extends OnDestroyClass
  implements OnInit
{
  property: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService
      .get(
        `ResidencialProperty/Detail/${this.activatedRoute.snapshot.paramMap.get(
          'propertyId'
        )}`
      )
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        if (response.data.project) {
          response.data.project = 
            this.showProjectImage(response.data.project.replace("default.jpg", ""));
        }
        this.property = response.data;
          if ( typeof this.property.photo != 'undefined' 
            && this.property.photo.length > 0) {
            this.property.photo = this.property.photo.map((val: any, index: number) => {
              val.index =  index;
              return val;
            });
          }
        });
  }

  public showProjectImage( value: string ) {
    return ( value.includes( "http" ) ) ? value : environment.baseUrl + environment.assetPath + value;
  }
}
