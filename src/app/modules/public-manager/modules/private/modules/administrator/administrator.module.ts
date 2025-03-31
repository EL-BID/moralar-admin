import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';

// modules
import { AdministratorsModule } from '../administrators/administrators.module';

// containers
import { AdministratorComponent } from './administrator.component';
import { AdministratorDetailsComponent } from './containers/administrator-details/administrator-details.component';

@NgModule({
  declarations: [
    // containers
    AdministratorComponent,
    AdministratorDetailsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    // modules
    AdministratorsModule
  ]
})
export class AdministratorModule { }
