import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-questionnare-avaliable-list',
  templateUrl: './questionnare-avaliable-list.component.html',
  styleUrls: ['./questionnare-avaliable-list.component.sass'],
})
export class QuestionnareAvaliableListComponent extends ListComponentClass {
  constructor(
    private activatedRoute: ActivatedRoute,

    private router: Router
  ) {
    super();
  }

  handleDetails(id: string): void {
    this.router.navigate([
      `/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/questionarios`,
      id,
    ]);
  }
  handleDetailsAvaliable(quizId: string, quizFamilyId: string): void {
    this.router.navigate([
      `/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/questionarios/disponiveis`,
      quizId,
      quizFamilyId,
    ]);
  }
}
