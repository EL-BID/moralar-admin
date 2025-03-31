import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliesRoutingModule } from './families-routing.module';

// containers
import { FamiliesComponent } from './families.component';

@NgModule({
  declarations: [
    // containers
    FamiliesComponent
  ],
  imports: [
    CommonModule,
    FamiliesRoutingModule
  ]
})
export class FamiliesModule { }
