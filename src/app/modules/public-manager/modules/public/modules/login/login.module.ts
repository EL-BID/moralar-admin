import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './containers/login/login.component';
import { LoginRoutingModule } from './login-routing.module';

// modules
// containers
@NgModule({
  declarations: [
    // containers
    LoginComponent,
    LoginFormComponent,
  ],
  imports: [LoginRoutingModule, SharedModule],
})
export class LoginModule {}
