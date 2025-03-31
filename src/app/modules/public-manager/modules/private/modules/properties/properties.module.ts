import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';

// containers
import { PropertiesComponent } from './properties.component';

@NgModule({
  declarations: [
    // containers
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
