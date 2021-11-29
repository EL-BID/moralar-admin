import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { AvailablesComponent } from './availables.component';
import { AvailablesListComponent } from './containers/availables-list/availables-list.component';
import { AvailablesDetailsComponent } from './containers/availables-details/availables-details.component';

const routes: Routes = [
  {
    path: '',
    component: AvailablesComponent,
    children: [
      { path: '', component: AvailablesListComponent },
      { path: ':quizId', component: AvailablesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailablesRoutingModule {}
