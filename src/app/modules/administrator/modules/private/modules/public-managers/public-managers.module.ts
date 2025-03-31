import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PublicManagerFormComponent } from './components/public-manager-form/public-manager-form.component';
import { PublicManagerListSearchComponent } from './components/public-manager-list-search/public-manager-list-search.component';
import { PublicManagerListComponent } from './components/public-manager-list/public-manager-list.component';
import { PublicManagersAddComponent } from './containers/public-managers-add/public-managers-add.component';
import { PublicManagersListComponent } from './containers/public-managers-list/public-managers-list.component';
import { PublicManagersRoutingModule } from './public-managers-routing.module';
import { PublicManagersComponent } from './public-managers.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    PublicManagersComponent,
    PublicManagersListComponent,
    PublicManagersAddComponent,
    // components
    PublicManagerListComponent,
    PublicManagerListSearchComponent,
    PublicManagerFormComponent,
  ],
  imports: [
    PublicManagersRoutingModule,
    // modules
    SharedModule,
  ],
})
export class PublicManagersModule {}
