import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyListSearchComponent } from './components/property-list-search/property-list-search.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyViewComponent } from './components/property-view/property-view.component';
import { PropertiesAddComponent } from './containers/properties-add/properties-add.component';
import { PropertiesDetailsComponent } from './containers/properties-details/properties-details.component';
import { PropertiesEditComponent } from './containers/properties-edit/properties-edit.component';
import { PropertiesListComponent } from './containers/properties-list/properties-list.component';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    PropertiesComponent,
    PropertiesListComponent,
    PropertiesAddComponent,
    PropertiesDetailsComponent,
    PropertiesEditComponent,
    // components
    PropertyListComponent,
    PropertyListSearchComponent,
    PropertyFormComponent,
    PropertyViewComponent,
  ],
  imports: [PropertiesRoutingModule, SharedModule],
  exports: [PropertyViewComponent],
})
export class PropertiesModule {}
