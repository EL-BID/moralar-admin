import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { PollListComponent } from './components/poll-list/poll-list.component';
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
    // components
    PollListComponent,
  ],
  exports: [PollListComponent],
  imports: [PollsRoutingModule, SharedModule],
})
export class PollsModule {}
