import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import {
  dateToString,
  formartDateToMillisecondsBRL,
} from 'src/app/utils/functions/date.function';
import { Enums } from 'src/app/utils/functions/enums.function';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { HttpService } from 'src/app/utils/services/http/http.service';

@Component({
  selector: 'app-families-details',
  templateUrl: './families-details.component.html',
  styleUrls: ['./families-details.component.sass'],
})
export class FamiliesDetailsComponent extends OnDestroyClass implements OnInit {
  family: any;
  formLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.httpService
      .get(
        `Family/Detail/${this.activatedRoute.snapshot.paramMap.get('familyId')}`
      )
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.family = response.data;
        this.family.holder.birthday = dateToString(
          response.data.holder.birthday
        );
        this.transformEnumsFamilyDetail();
        this.family.spouse.birthday = dateToString(
          response.data.spouse.birthday
        );
        for (let i = 0; this.family.members.length > i; i++) {
          this.family.members[i].birthday = dateToString(
            this.family.members[i].birthday
          );
          this.transformEnumsMembersFamily(i);
        }
      });
  }

  private transformEnumsMembersFamily(i: number): void {
    if (this.family.members[i].genre) {
      this.family.members[i].genre = Enums.getForTypeGenre(this.family.members[i].genre);
    }
    if (this.family.members[i].kinShip) {
      this.family.members[ i ].kinShip = Enums.getTypeTypeKingShip(this.family.members[i].kinShip);
    }
    if (this.family.members[i].scholarity) {
      this.family.members[i].scholarity = Enums.getForTypeScholarity(this.family.members[i].scholarity);
    }
  }

  private transformEnumsFamilyDetail(): void {
    if (this.family.holder.genre) {
      this.family.holder.genre = Enums.getForTypeGenre(this.family.holder.genre);
    }
    if (this.family.holder.scholarity) {
      this.family.holder.scholarity = Enums.getForTypeScholarity( this.family.holder.scholarity ); 
    }

    if (this.family.spouse.genre) {
      this.family.spouse.genre = Enums.getForTypeGenre( 
        this.family.spouse.genre);
    }
    if ( this.family.spouse.spouseScholarity) {
      this.family.spouse.spouseScholarity = Enums.getForTypeScholarity(
        this.family.spouse.spouseScholarity);
    }
  }

  handleFormSubmit(value: any): void {
    if (this.formLoading === false) {
      this.formLoading = true;
      if (value.holder.email === '') {
        value.holder.email = null;
      }
      value.id = this.family.id;
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
        .post('Family/Edit', value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.success);
            this.location.back();
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.formLoading = false;
          }
        );
    }
  }
}
