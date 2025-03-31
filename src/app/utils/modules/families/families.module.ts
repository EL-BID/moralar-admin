import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PropertiesModule } from '../properties/properties.module';
import { FamilyFormComponent } from './components/family-form/family-form.component';
import { FamilyListSearchComponent } from './components/family-list-search/family-list-search.component';
import { FamilyListComponent } from './components/family-list/family-list.component';
import { FamilyViewComponent } from './components/family-view/family-view.component';
import { FamiliesAddComponent } from './containers/families-add/families-add.component';
import { FamiliesDetailsComponent } from './containers/families-details/families-details.component';
import { FamiliesListComponent } from './containers/families-list/families-list.component';
import { FamiliesRoutingModule } from './families-routing.module';
import { FamiliesComponent } from './families.component';

// modules
// containers
// components
// consts

@NgModule({
  declarations: [
    // containers
    FamiliesComponent,
    FamiliesListComponent,
    FamiliesAddComponent,
    FamiliesDetailsComponent,
    // components
    FamilyListComponent,
    FamilyListSearchComponent,
    FamilyFormComponent,
    FamilyViewComponent,
  ],
  imports: [FamiliesRoutingModule, SharedModule, PropertiesModule],
  exports: [
    FamilyListSearchComponent,
    FamilyListComponent,
    FamilyFormComponent,
    FamilyViewComponent,
  ],
})
export class FamiliesModule {}
