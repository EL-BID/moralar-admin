import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { DashboardDetailsComponent } from './containers/dashboard-details/dashboard-details.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

// modules
// containers
@NgModule({
  declarations: [
    // containers
    DashboardComponent,
    DashboardDetailsComponent,
  ],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
