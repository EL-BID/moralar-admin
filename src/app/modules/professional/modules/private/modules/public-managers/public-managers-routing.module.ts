import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PublicManagersAddComponent } from './containers/public-managers-add/public-managers-add.component';
import { PublicManagersListComponent } from './containers/public-managers-list/public-managers-list.component';
import { PublicManagersComponent } from './public-managers.component';

const routes: Routes = [
  {
    path: '',
    component: PublicManagersComponent,
    children: [
      { path: '', component: PublicManagersListComponent },
      { path: 'adicionar', component: PublicManagersAddComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicManagersRoutingModule { }
