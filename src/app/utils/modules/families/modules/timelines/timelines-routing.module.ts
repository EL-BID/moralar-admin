import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { TimelinesComponent } from './timelines.component';
import { TimelinesListComponent } from './containers/timelines-list/timelines-list.component';
import { TimelinesDetailsComponent } from './containers/timelines-details/timelines-details.component';

const routes: Routes = [
  {
    path: '',
    component: TimelinesComponent,
    children: [
      { path: '', component: TimelinesListComponent },
      { path: ':familyId/:typeSubject', component: TimelinesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinesRoutingModule {}
