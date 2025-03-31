import { NgModule } from '@angular/core';
import { MegaleiosFormsModule } from 'src/app/utils/modules/megaleios-forms/megaleios-forms.module';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { AvailablesModule } from '../../../questionnaires/modules/availables/availables.module';
import { QuestionnairesModule } from '../../../questionnaires/questionnaires.module';
import { CoursesModule } from '../courses/courses.module';
import { MatchesModule } from '../matches/matches.module';
import { PollsModule } from '../polls/polls.module';
import { QuestionnariesAvaliableModule } from '../questionnaries-avaliable/questionnaries-avaliable.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { TimelineListSearchComponent } from './components/timeline-list-search/timeline-list-search.component';
import { TimelineListComponent } from './components/timeline-list/timeline-list.component';
import { TimelineViewComponent } from './components/timeline-view/timeline-view.component';
import { TimelinesDetailsComponent } from './containers/timelines-details/timelines-details.component';
import { TimelinesListComponent } from './containers/timelines-list/timelines-list.component';
import { TimelinesRoutingModule } from './timelines-routing.module';
import { TimelinesComponent } from './timelines.component';

// containers
// components
import Timeline = gsap.core.Timeline;
@NgModule({
  declarations: [
    // containers
    TimelinesComponent,
    TimelinesListComponent,
    TimelinesDetailsComponent,
    // components
    TimelineListComponent,
    TimelineListSearchComponent,
    TimelineViewComponent,
  ],
  imports: [
    TimelinesRoutingModule,
    // modules
    MegaleiosFormsModule,
    SharedModule,
    AvailablesModule,
    MatchesModule,
    QuestionnairesModule,
    QuestionnariesAvaliableModule,
    CoursesModule,
    PollsModule,
    SchedulesModule,
  ],
})
export class TimelinesModule {}
