import { NgModule } from '@angular/core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PropertiesModule } from '../../../properties/properties.module';
import { FamiliesModule } from '../../families.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchsListComponent } from './containers/matchs-list/matchs-list.component';
import { MatchsRoutingModule } from './matchs-routing.module';
import { MatchsComponent } from './matchs.component';

// containers
// components
import Timeline = gsap.core.Timeline;
@NgModule({
  declarations: [
    // containers
    MatchsComponent,
    MatchsListComponent,
    // components
    MatchListComponent,
  ],
  exports: [MatchListComponent],
  imports: [
    MatchsRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgbAccordionModule,
    FontAwesomeTestingModule,
    FamiliesModule,
    PropertiesModule,
  ],
})
export class MatchsModule {}
