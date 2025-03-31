import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import {NotificationsComponent} from './notifications.component';
import {NotificationsListComponent} from './containers/notifications-list/notifications-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    children: [
      { path: '', component: NotificationsListComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
