import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationsListComponent } from './containers/notifications-list/notifications-list.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

// consts
@NgModule({
  declarations: [
    NotificationsComponent,
    // containers
    NotificationsListComponent,
    // components
    NotificationListComponent,
  ],
  imports: [NotificationsRoutingModule, SharedModule],
  exports: [NotificationsListComponent],
})
export class NotificationsModule {}
