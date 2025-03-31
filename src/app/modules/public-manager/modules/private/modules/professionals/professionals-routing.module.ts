import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { ProfessionalsComponent } from './professionals.component';
import { ProfessionalsListComponent } from './containers/professionals-list/professionals-list.component';
import { ProfessionalsAddComponent } from './containers/professionals-add/professionals-add.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalsComponent,
    children: [
      { path: '', component: ProfessionalsListComponent },
      { path: 'adicionar', component: ProfessionalsAddComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalsRoutingModule { }
