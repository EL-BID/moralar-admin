import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faCheckCircle, faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {PRIORIZATIONS} from '../../../../interfaces/families.interface';
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../services/http/http.service";
@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.sass']
})
export class FamilyViewComponent implements OnInit{
  priorizations: any[] = PRIORIZATIONS;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  @Input()
  family: any;

  property: any = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
    this.httpService.get(`ResidencialProperty/Detail/${this.activatedRoute.snapshot.paramMap.get('residencialPropertyId')}`)
      .subscribe((response: any) => {
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


}
