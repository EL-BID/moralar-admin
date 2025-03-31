import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { ProfessionalFormComponent } from './components/professional-form/professional-form.component';
import { ProfessionalListSearchComponent } from './components/professional-list-search/professional-list-search.component';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';
import { ProfessionalsAddComponent } from './containers/professionals-add/professionals-add.component';
import { ProfessionalsListComponent } from './containers/professionals-list/professionals-list.component';
import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { ProfessionalsComponent } from './professionals.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    ProfessionalsComponent,
    ProfessionalsListComponent,
    ProfessionalsAddComponent,
    // components
    ProfessionalListComponent,
    ProfessionalListSearchComponent,
    ProfessionalFormComponent,
  ],
  imports: [
    ProfessionalsRoutingModule,
    // modules

    SharedModule,
  ],
})
export class ProfessionalsModule {}
