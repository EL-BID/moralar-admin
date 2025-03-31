import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PollFormComponent } from './components/poll-form/poll-form.component';
import { PollListSearchComponent } from './components/poll-list-search/poll-list-search.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollViewComponent } from './components/poll-view/poll-view.component';
import { PollsAddComponent } from './containers/polls-add/polls-add.component';
import { PollsDetailsComponent } from './containers/polls-details/polls-details.component';
import { PollsListComponent } from './containers/polls-list/polls-list.component';
import { PollsRoutingModule } from './polls-routing.module';
import { PollsComponent } from './polls.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    PollsComponent,
    PollsListComponent,
    PollsAddComponent,
    PollsDetailsComponent,
    // components
    PollListComponent,
    PollListSearchComponent,
    PollFormComponent,
    PollViewComponent,
  ],
  exports: [PollListComponent],
  imports: [PollsRoutingModule, SharedModule],
})
export class PollsModule {}
