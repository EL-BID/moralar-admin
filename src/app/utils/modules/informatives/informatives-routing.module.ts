import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InformativesComponent} from './informatives.component';
import {InformativesListComponent} from './containers/informatives-list/informatives-list.component';
import {InformativesAddComponent} from './containers/informatives-add/informatives-add.component';
import {InformativesDetailsComponent} from './containers/informatives-details/informatives-details.component';

const routes: Routes = [
  {
    path: '',
    component: InformativesComponent,
    children: [
      { path: '', component: InformativesListComponent },
      { path: 'adicionar', component: InformativesAddComponent },
      { path: ':informativeId', component: InformativesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformativesRoutingModule { }
