import { Component } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import { Enums } from 'src/app/utils/functions/enums.function';
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

  itIsResettlementStage(typeSubject: string): boolean {
    const resettlementSteps = [2, 4, 7, 8];
    return resettlementSteps.includes(
      Enums.getTypeSubjectByName(typeSubject));
  }
}
