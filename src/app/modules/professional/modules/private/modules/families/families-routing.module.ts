import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliesComponent } from 'src/app/utils/modules/families/families.component';

const routes: Routes = [
  {
    path: '',
    component: FamiliesComponent,
    children: [
      {
        path: 'linhas-do-tempo',
        loadChildren: () => import('src/app/utils/modules/families/modules/timelines/timelines.module').then(m => m.TimelinesModule)
      },
      {
        path: '',
        loadChildren: () => import('src/app/utils/modules/families/families.module').then(m => m.FamiliesModule)
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliesRoutingModule { }
