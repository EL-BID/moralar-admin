import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { AdministratorComponent } from './administrator.component';

// guards
import { PrivateGuard } from './modules/private/guards/private/private.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'app',
        loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule),
        canActivate: [PrivateGuard]
      },
      {
        path: '',
        loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
