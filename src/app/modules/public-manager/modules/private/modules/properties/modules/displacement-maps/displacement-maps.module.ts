import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { DisplacementMapListSearchComponent } from './components/displacement-map-list-search/displacement-map-list-search.component';
import { DisplacementMapListComponent } from './components/displacement-map-list/displacement-map-list.component';
import { DisplacementMapsListComponent } from './containers/displacement-maps-list/displacement-maps-list.component';
import { DisplacementMapsRoutingModule } from './displacement-maps-routing.module';
import { DisplacementMapsComponent } from './displacement-maps.component';
import { DisplacementMapDetailsComponent } from './components/displacement-map-details/displacement-map-details.component';

// containers
// components
import Timeline = gsap.core.Timeline;
@NgModule({
  declarations: [
    // containers
    DisplacementMapsComponent,
    DisplacementMapsListComponent,
    // components
    DisplacementMapListComponent,
    DisplacementMapListSearchComponent,
    DisplacementMapDetailsComponent,
  ],
  imports: [DisplacementMapsRoutingModule, SharedModule],
  exports: [],
})
export class DisplacementMapsModule {}
