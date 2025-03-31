import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { FamiliesComponent } from './families.component';
import { FamiliesListComponent } from './containers/families-list/families-list.component';
import { FamiliesAddComponent } from './containers/families-add/families-add.component';
import { FamiliesDetailsComponent } from './containers/families-details/families-details.component';

const routes: Routes = [
  {
    path: '',
    component: FamiliesComponent,
    children: [
      { path: '', component: FamiliesListComponent },
      { path: 'adicionar', component: FamiliesAddComponent },
      { path: ':familyId', component: FamiliesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliesRoutingModule { }
