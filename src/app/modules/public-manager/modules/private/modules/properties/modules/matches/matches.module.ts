import { NgModule } from '@angular/core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { FamiliesModule } from '../../../../../../../../utils/modules/families/families.module';
import { PropertiesModule } from '../../../../../../../../utils/modules/properties/properties.module';
import { MatchListSearchComponent } from './components/match-list-search/match-list-search.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchViewComponent } from './components/match-view/match-view.component';
import { MatchesDetailsComponent } from './containers/matches-details/matches-details.component';
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
    MatchesDetailsComponent,
    // components
    MatchListComponent,
    MatchListSearchComponent,
    MatchViewComponent,
  ],
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
