import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { AvailablesRoutingModule } from './availables-routing.module';
import { AvailablesComponent } from './availables.component';
import { AvailableListSearchComponent } from './components/available-list-search/available-list-search.component';
import { AvailableListComponent } from './components/available-list/available-list.component';
import { ReleaseFamilyListSearchComponent } from './components/release-family-list-search/release-family-list-search.component';
import { ReleaseFamilyListComponent } from './components/release-family-list/release-family-list.component';
import { ReleaseViewComponent } from './components/release-view/release-view.component';
import { AvailablesDetailsComponent } from './containers/availables-details/availables-details.component';
import { AvailablesListComponent } from './containers/availables-list/availables-list.component';
import { ReleasesFamiliesListComponent } from './containers/releases-families-list/releases-families-list.component';

// modules
// containers
@NgModule({
  declarations: [
    // containers
    AvailablesComponent,
    AvailablesListComponent,
    AvailablesDetailsComponent,
    AvailableListComponent,
    AvailableListSearchComponent,
    ReleasesFamiliesListComponent,
    ReleaseFamilyListComponent,
    ReleaseFamilyListSearchComponent,
    ReleaseViewComponent,
  ],
  exports: [AvailableListComponent, ReleaseFamilyListSearchComponent],
  imports: [AvailablesRoutingModule, SharedModule],
})
export class AvailablesModule {}
