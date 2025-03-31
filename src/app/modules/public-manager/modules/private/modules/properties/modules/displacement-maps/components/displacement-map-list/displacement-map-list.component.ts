import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import { timelineStatusToString } from 'src/app/utils/functions/timelines.function';

@Component({
  selector: 'app-displacement-map-list',
  templateUrl: './displacement-map-list.component.html',
  styleUrls: ['./displacement-map-list.component.sass']
})
export class DisplacementMapListComponent extends ListComponentClass {

  timelineStatusToString = timelineStatusToString;

}
