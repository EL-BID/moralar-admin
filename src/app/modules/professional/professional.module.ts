import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalRoutingModule } from './professional-routing.module';

// containers
import { ProfessionalComponent } from './professional.component';

@NgModule({
  declarations: [
    // containers
    ProfessionalComponent
  ],
  imports: [
    CommonModule,
    ProfessionalRoutingModule
  ]
})
export class ProfessionalModule { }
