import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';

// containers
import { AdministratorComponent } from './administrator.component';

@NgModule({
  declarations: [
    // containers
    AdministratorComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]
})
export class AdministratorModule { }
