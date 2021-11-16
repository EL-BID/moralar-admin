import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MegaleiosFormsModule } from '../megaleios-forms/megaleios-forms.module';
import { SharedModule } from '../shared/shared.module';
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';
import { ProfilesRoutingModule } from './profiles-routing.module';

// consts
import { ProfilesComponent } from './profiles.component';
import { ProfilesAddComponent } from './containers/profiles-add/profiles-add.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { CustomCurrencyMaskConfig } from 'src/app/core/conf/maskCurrency';

@NgModule({
  declarations: [
    ProfilesComponent,
    // containers
    ProfilesAddComponent,
    // components
    ProfileFormComponent,
    ChangePasswordFormComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    // modules
    ReactiveFormsModule,
    MegaleiosFormsModule,
    SharedModule,
    CurrencyMaskModule,
    NgxMaskModule,
  ],
  exports: [],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
  ],
})
export class ProfilesModule {}
