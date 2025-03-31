import { HttpService } from './../../../../services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.sass'],
})
export class PollListComponent extends ListComponentClass {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super();
  }

  handleDetails(id: any): void {
    console.log(id)
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }
}
