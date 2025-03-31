import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PollsComponent } from './polls.component';
import { PollsListComponent } from './containers/polls-list/polls-list.component';
import { PollsAddComponent } from './containers/polls-add/polls-add.component';
import { PollsDetailsComponent } from './containers/polls-details/polls-details.component';

const routes: Routes = [
  {
    path: '',
    component: PollsComponent,
    children: [
      { path: '', component: PollsListComponent },
      { path: 'adicionar', component: PollsAddComponent },
      { path: ':pollId', component: PollsDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule { }
