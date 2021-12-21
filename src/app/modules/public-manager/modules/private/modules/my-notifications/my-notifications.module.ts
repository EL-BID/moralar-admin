import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyNotificationsRoutingModule } from './my-notifications-routing.module';
import { MyNotificationsComponent } from './my-notifications.component';


@NgModule({
  declarations: [MyNotificationsComponent],
  imports: [
    CommonModule,
    MyNotificationsRoutingModule
  ]
})
export class MyNotificationsModule { }
