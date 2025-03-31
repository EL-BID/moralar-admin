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
import { MatchesListComponent } from './containers/matches-list/matches-list.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';

// containers
// components
import Timeline = gsap.core.Timeline;
@NgModule({
  declarations: [
    // containers
    MatchesComponent,
    MatchesListComponent,
    // components
    MatchListComponent,
  ],
  exports: [MatchListComponent],
  imports: [
    MatchesRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgbAccordionModule,
    FontAwesomeTestingModule,
    FamiliesModule,
    PropertiesModule,
  ],
})
export class MatchesModule { }
