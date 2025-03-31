import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { PasswordResetComponent } from './containers/password-reset/password-reset.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';

// modules
// containers
@NgModule({
  declarations: [
    // containers
    PasswordResetComponent,
    PasswordResetFormComponent,
  ],
  imports: [
    PasswordResetRoutingModule,
    // modules
    SharedModule,
  ],
})
export class PasswordResetModule {}
