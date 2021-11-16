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
import { MatchsDetailsComponent } from './containers/matchs-details/matchs-details.component';
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
    MatchsDetailsComponent,
    // components
    MatchListComponent,
    MatchListSearchComponent,
    MatchViewComponent,
  ],
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
