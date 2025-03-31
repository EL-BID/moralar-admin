import { NgModule } from '@angular/core';

import { FamiliesModule } from '../../../../../../utils/modules/families/families.module';
import { SharedModule } from '../../../../../../utils/modules/shared/shared.module';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { NotificationListSearchComponent } from './components/notification-list-search/notification-list-search.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationViewComponent } from './components/notification-view/notification-view.component';
import { NotificationsAddComponent } from './containers/notifications-add/notifications-add.component';
import { NotificationsDetailsComponent } from './containers/notifications-details/notifications-details.component';
import { NotificationsListComponent } from './containers/notifications-list/notifications-list.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

// consts
@NgModule({
  declarations: [
    NotificationsComponent,
    // containers
    NotificationsListComponent,
    NotificationsAddComponent,
    NotificationsDetailsComponent,
    // components
    NotificationListComponent,
    NotificationListSearchComponent,
    NotificationViewComponent,
    NotificationFormComponent,
  ],
  imports: [NotificationsRoutingModule, SharedModule, FamiliesModule],
  exports: [NotificationListComponent, NotificationListSearchComponent],
})
export class NotificationsModule {}
