import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { QuestionnareAvaliableListComponent } from './components/questionnare-avaliable-list/questionnare-avaliable-list.component';
import { QuestionnariesAvaliableListComponent } from './containers/questionnaries-avaliable-list/questionnaries-avaliable-list.component';
import { QuestionnariesAvaliableRoutingModule } from './questionnaries-avaliable-routing.module';
import { QuestionnariesAvaliableComponent } from './questionnaries-avaliable.component';

// modules
// containers

@NgModule({
  declarations: [
    // containers
    QuestionnariesAvaliableComponent,
    QuestionnariesAvaliableListComponent,
    QuestionnareAvaliableListComponent,
  ],
  exports: [QuestionnareAvaliableListComponent],
  imports: [QuestionnariesAvaliableRoutingModule, SharedModule],
})
export class QuestionnariesAvaliableModule {}
