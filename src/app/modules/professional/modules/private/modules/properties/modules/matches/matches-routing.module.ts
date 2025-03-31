import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { MatchesComponent } from './matches.component';
import { MatchesListComponent } from './containers/matches-list/matches-list.component';
import { MatchesDetailsComponent } from './containers/matches-details/matches-details.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent,
    children: [
      { path: '', component: MatchesListComponent },
      { path: ':residencialPropertyId', component: MatchesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
