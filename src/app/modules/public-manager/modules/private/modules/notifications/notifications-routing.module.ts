import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationsListComponent } from './containers/notifications-list/notifications-list.component';
import { NotificationsAddComponent } from './containers/notifications-add/notifications-add.component';
import { NotificationsDetailsComponent } from './containers/notifications-details/notifications-details.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    children: [
      { path: '', component: NotificationsListComponent },
      //{ path: '', component: NotificationsAddComponent },
      { path: 'adicionar', component: NotificationsAddComponent },
      { path: ':notificationId', component: NotificationsDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
