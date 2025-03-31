import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplacementMapDetailsComponent } from './components/displacement-map-details/displacement-map-details.component';
import { DisplacementMapsListComponent } from './containers/displacement-maps-list/displacement-maps-list.component';
import { DisplacementMapsComponent } from './displacement-maps.component';

// containers
const routes: Routes = [
  {
    path: '',
    component: DisplacementMapsComponent,
    children: [
      { path: '', component: DisplacementMapsListComponent },
      { path: 'family/:id', component: DisplacementMapDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplacementMapsRoutingModule {}
