import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyNotificationsRoutingModule } from './my-notifications-routing.module';
import { MyNotificationsComponent } from './my-notifications.component';
import { NotificationsModule } from '../notifications/notifications.module';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

@NgModule({
  declarations: [MyNotificationsComponent],
  imports: [
    CommonModule,
    MyNotificationsRoutingModule,
    NotificationsModule,
    SharedModule,
  ],
  exports: [MyNotificationsComponent],
})
export class MyNotificationsModule {}
