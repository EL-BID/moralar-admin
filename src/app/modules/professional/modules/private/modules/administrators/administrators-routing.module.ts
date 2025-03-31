import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { AdministratorsComponent } from './administrators.component';
import { AdministratorsListComponent } from './containers/administrators-list/administrators-list.component';
import { AdministratorsAddComponent } from './containers/administrators-add/administrators-add.component';
import { AdministratorsDetailsComponent } from './containers/administrators-details/administrators-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorsComponent,
    children: [
      { path: '', component: AdministratorsListComponent },
      { path: 'adicionar', component: AdministratorsAddComponent },
      { path: ':administratorId', component: AdministratorsDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorsRoutingModule { }
