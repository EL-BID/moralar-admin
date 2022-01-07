import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import {
  timelineStatusToString,
  timelineTypeSubjectToString,
} from 'src/app/utils/functions/timelines.function';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.sass'],
})
export class TimelineListComponent extends ListComponentClass {
  timelineStatusToString = timelineStatusToString;
  timelineTypeSubjectToString = timelineTypeSubjectToString;
}
