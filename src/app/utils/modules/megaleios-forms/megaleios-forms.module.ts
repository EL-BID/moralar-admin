import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ControlCheckboxComponent } from './components/control-checkbox/control-checkbox.component';
import { ControlDatePickerComponent } from './components/control-date-picker/control-date-picker.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ControlFieldComponent } from './components/control-field/control-field.component';
import { ControlRadioComponent } from './components/control-radio/control-radio.component';
import { ControlTipComponent } from './components/control-tip/control-tip.component';
import { MegaleiosFormsService } from './megaleios-forms.service';

// modules
// components
// services
const DECLARATIONS = [
  // components
  ControlFieldComponent,
  ControlErrorComponent,
  ControlCheckboxComponent,
  ControlRadioComponent,
  ControlDatePickerComponent,
  ControlTipComponent,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [SharedModule],
  exports: DECLARATIONS,
  providers: [MegaleiosFormsService],
})
export class MegaleiosFormsModule {}
