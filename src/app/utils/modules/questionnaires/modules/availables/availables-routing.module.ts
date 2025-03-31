import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailablesComponent } from './availables.component';
import { AvailablesDetailsComponent } from './containers/availables-details/availables-details.component';
import { AvailablesListComponent } from './containers/availables-list/availables-list.component';

// containers
const routes: Routes = [
  {
    path: '',
    component: AvailablesComponent,
    children: [
      { path: '', component: AvailablesListComponent },
      { path: ':quizId/:familyId', component: AvailablesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailablesRoutingModule {}
