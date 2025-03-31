import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InformativeFormComponent } from './components/informative-form/informative-form.component';
import { InformativeListSearchComponent } from './components/informative-list-search/informative-list-search.component';
import { InformativeListComponent } from './components/informative-list/informative-list.component';
import { InformativeViewComponent } from './components/informative-view/informative-view.component';
import { InformativesAddComponent } from './containers/informatives-add/informatives-add.component';
import { InformativesDetailsComponent } from './containers/informatives-details/informatives-details.component';
import { InformativesListComponent } from './containers/informatives-list/informatives-list.component';
import { InformativesRoutingModule } from './informatives-routing.module';
import { InformativesComponent } from './informatives.component';

// consts
@NgModule({
  declarations: [
    InformativesComponent,
    // containers
    InformativesListComponent,
    InformativesAddComponent,
    InformativesDetailsComponent,
    // components
    InformativeListComponent,
    InformativeListSearchComponent,
    InformativeFormComponent,
    InformativeViewComponent,
  ],
  imports: [InformativesRoutingModule, SharedModule],
})
export class InformativesModule {}
