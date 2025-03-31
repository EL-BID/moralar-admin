import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { FamiliesModule } from '../families/families.module';
import { RescheduleFormComponent } from './components/reschedule-form/reschedule-form.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { SchedulesAddComponent } from './containers/schedules-add/schedules-add.component';
import { SchedulesDetailsComponent } from './containers/schedules-details/schedules-details.component';
import { SchedulesListComponent } from './containers/schedules-list/schedules-list.component';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    SchedulesComponent,
    SchedulesListComponent,
    SchedulesAddComponent,
    // components
    ScheduleListComponent,
    ScheduleFormComponent,
    SchedulesDetailsComponent,
    ScheduleViewComponent,
    RescheduleFormComponent,
  ],
  imports: [SchedulesRoutingModule, SharedModule, FamiliesModule],
})
export class SchedulesModule {}
