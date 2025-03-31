import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { MegaleiosAlertComponent } from './megaleios-alert.component';

// services
import { MegaleiosAlertService } from './megaleios-alert.service';

@NgModule({
  declarations: [
    // components
    MegaleiosAlertComponent
  ],
  imports: [
    CommonModule,
    // modules
    FontAwesomeModule
  ],
  exports: [
    // components
    MegaleiosAlertComponent
  ],
  providers: [
    // services
    MegaleiosAlertService
  ]
})
export class MegaleiosAlertModule { }
