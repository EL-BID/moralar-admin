import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfilesAddComponent } from './containers/profiles-add/profiles-add.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';

// consts
@NgModule({
  declarations: [
    ProfilesComponent,
    // containers
    ProfilesAddComponent,
    // components
    ProfileFormComponent,
    ChangePasswordFormComponent,
  ],
  imports: [ProfilesRoutingModule, SharedModule],
  exports: [],
})
export class ProfilesModule {}
