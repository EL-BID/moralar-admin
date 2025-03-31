import { NgModule } from '@angular/core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PropertiesModule } from '../../../properties/properties.module';
import { FamiliesModule } from '../../families.module';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { SchedulesListComponent } from './containers/schedules-list/schedules-list.component';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';

// containers
// components

import Timeline = gsap.core.Timeline;
@NgModule({
  declarations: [
    // containers
    SchedulesComponent,
    SchedulesListComponent,
    // components
    ScheduleListComponent,
  ],
  exports: [ScheduleListComponent],
  imports: [
    SchedulesRoutingModule,
    // modules
    NgbDropdownModule,
    SharedModule,
    NgbAccordionModule,
    FontAwesomeTestingModule,
    FamiliesModule,
    PropertiesModule,
  ],
})
export class SchedulesModule {}
