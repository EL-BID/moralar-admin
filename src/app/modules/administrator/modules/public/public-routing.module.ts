import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'configuracao',
        loadChildren: () =>
          import('./modules/configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: 'redefinir-senha',
        loadChildren: () =>
          import('./modules/password-reset/password-reset.module').then(
            (m) => m.PasswordResetModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
