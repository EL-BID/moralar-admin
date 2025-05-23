import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyNotificationsComponent } from './my-notifications.component';

const routes: Routes = [{ path: '', component: MyNotificationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyNotificationsRoutingModule { }
