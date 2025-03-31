import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { AdministratorsComponent } from './administrators.component';
import { AdministratorFormComponent } from './components/administrator-form/administrator-form.component';
import { AdministratorListSearchComponent } from './components/administrator-list-search/administrator-list-search.component';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { AdministratorsAddComponent } from './containers/administrators-add/administrators-add.component';
import { AdministratorsDetailsComponent } from './containers/administrators-details/administrators-details.component';
import { AdministratorsListComponent } from './containers/administrators-list/administrators-list.component';

@NgModule({
  declarations: [
    // containers
    AdministratorsComponent,
    AdministratorsListComponent,
    AdministratorsAddComponent,
    AdministratorsDetailsComponent,
    // components
    AdministratorListComponent,
    AdministratorListSearchComponent,
    AdministratorFormComponent,
  ],
  imports: [
    AdministratorsRoutingModule,
    // modules
    SharedModule,
  ],
  exports: [
    // components
    AdministratorFormComponent,
  ],
})
export class AdministratorsModule {}
