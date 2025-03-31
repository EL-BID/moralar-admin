import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { ConfigurationFormComponent } from './components/configuration-form/configuration-form.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  declarations: [
    // containers
    ConfigurationComponent,
    // components
    ConfigurationFormComponent,
  ],
  imports: [ConfigurationRoutingModule, SharedModule],
})
export class ConfigurationModule {}
