import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { createDefaultFields } from 'src/app/utils/modules/properties/modules/matchesListDefaultFields';

const defaultFields = createDefaultFields()

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.sass'],
})
export class MatchesListComponent extends ListContainerClass {
  formDataModel: FormDataModel = {
    ...defaultFields.formDataModel,
    order: {
      column: '0',
      direction: 'asc',
    },
  };

  uri = 'PropertiesInterest';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    httpService: HttpService
  ) {
    super(activatedRoute, router, httpService);
  }

  handleDetails(): void {
    this.router.navigate([this.listSelected[0].residencialPropertyId], {
      relativeTo: this._activatedRoute,
    });
  }
}
