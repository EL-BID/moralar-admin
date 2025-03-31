import { HttpService } from './../../../../../../services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.sass'],
})
export class AvailableListComponent extends ListComponentClass {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    super();
  }

  handleDetails(item: any): void {
    this.router.navigate([item.quizId, item.familyId], {
      relativeTo: this.activatedRoute,
    });
  }
}
