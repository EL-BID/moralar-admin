import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateGuard } from './modules/private/guards/private/private.guard';
import { PublicManagerComponent } from './public-manager.component';

// containers
// guards
const routes: Routes = [
  {
    path: '',
    component: PublicManagerComponent,
    children: [
      {
        path: 'app',
        loadChildren: () =>
          import('./modules/private/private.module').then(
            (m) => m.PrivateModule
          ),
        canActivate: [PrivateGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicManagerRoutingModule {}
