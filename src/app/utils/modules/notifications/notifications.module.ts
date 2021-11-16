import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MegaleiosFormsModule } from '../megaleios-forms/megaleios-forms.module';
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
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    // modules
    ReactiveFormsModule,
    MegaleiosFormsModule,
    SharedModule,
  ],
  exports: [NotificationsListComponent],
})
export class NotificationsModule {}
