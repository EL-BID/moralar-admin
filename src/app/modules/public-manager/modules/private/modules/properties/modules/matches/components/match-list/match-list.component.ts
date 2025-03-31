import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import { timelineStatusToString } from 'src/app/utils/functions/timelines.function';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.sass']
})
export class MatchListComponent extends ListComponentClass {

  timelineStatusToString = timelineStatusToString;

}
