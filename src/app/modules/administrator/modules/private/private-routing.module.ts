import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PrivateComponent } from './private.component';
import { MyNotificationsComponent } from 'src/app/modules/public-manager/modules/private/modules/my-notifications/my-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'administrador',
        loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'familias',
        loadChildren: () => import('src/app/utils/modules/families/families.module').then(m => m.FamiliesModule)
      },
      {
        path: 'profissionais-tts',
        loadChildren: () => import('./modules/professionals/professionals.module').then(m => m.ProfessionalsModule)
      },
      {
        path: 'gestores-publicos',
        loadChildren: () => import('./modules/public-managers/public-managers.module').then(m => m.PublicManagersModule)
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import( 'src/app/utils/modules/schedules/schedules.module' ).then(
            ( m ) => m.SchedulesModule
          ),
      },
      {
        path: 'questionarios',
        loadChildren: () =>
          import(
            'src/app/utils/modules/questionnaires/questionnaires.module'
          ).then( ( m ) => m.QuestionnairesModule ),
      },
      {
        path: 'imoveis',
        loadChildren: () => import('src/app/utils/modules/properties/properties.module').then(m => m.PropertiesModule)
      },
      {
        path: 'matches',
        loadChildren: () =>
          import(
            'src/app/modules/public-manager/modules/private/modules/properties/modules/matches/matches.module'
          ).then( ( m ) => m.MatchesModule ),
      },
      {
        path: 'administradores',
        loadChildren: () => import('./modules/administrators/administrators.module').then(m => m.AdministratorsModule)
      },
      { path: 'notificacoes', component: MyNotificationsComponent },
      {
        path: 'notificacoes/adicionar',
        loadChildren: () =>
          import(
            'src/app/modules/professional/modules/private/modules/notifications/notifications.module'
          ).then( ( m ) => m.NotificationsModule ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
