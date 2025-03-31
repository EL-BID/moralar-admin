import { Routes } from '@angular/router';
import { PropertiesComponent } from '../../properties/properties.component';

const publicManagerRootFolder = "src/app/modules/public-manager"
const professionalRootFolder = "src/app/modules/professional";

export function fetchRoutes(isPublicManager: boolean): Routes {
  const rootFolder = isPublicManager ? publicManagerRootFolder : professionalRootFolder
  return [
    {
      path: 'dashboard',
      loadChildren: () =>
        import(`${rootFolder}/modules/private/modules/dashboard/dashboard.module`).then(
          (m) => m.DashboardModule
        ),
    },
    {
      path: 'familias',
      loadChildren: () =>
        import(`${rootFolder}/modules/private/modules/families/families.module`).then(
          (m) => m.FamiliesModule
        ),
    },
    {
      path: 'agendamentos',
      loadChildren: () =>
        import('src/app/utils/modules/schedules/schedules.module').then(
          (m) => m.SchedulesModule
        ),
    },
    {
      path: 'imoveis',
      loadChildren: () =>
        import('src/app/utils/modules/properties/properties.module').then(
          (m) => m.PropertiesModule
        ),
    },
    {
      path: 'matches',
      loadChildren: () =>
        import(
          `${rootFolder}/modules/private/modules/properties/modules/matches/matches.module`
        ).then((m) => m.MatchesModule),
    },
    {
      path: 'displacement-maps',
      loadChildren: () =>
        import(
          `${publicManagerRootFolder}/modules/private/modules/properties/modules/displacement-maps/displacement-maps.module`
        ).then((m) => m.DisplacementMapsModule),
    },
    {
      path: 'videos',
      loadChildren: () =>
        import('src/app/utils/modules/videos/videos.module').then(
          (m) => m.VideosModule
        ),
    },
    {
      path: 'questionarios',
      loadChildren: () =>
        import(
          'src/app/utils/modules/questionnaires/questionnaires.module'
        ).then((m) => m.QuestionnairesModule),
    },
    {
      path: 'enquetes',
      loadChildren: () =>
        import('src/app/utils/modules/polls/polls.module').then(
          (m) => m.PollsModule
        ),
    },
    {
      path: 'informativos',
      loadChildren: () =>
        import('src/app/utils/modules/informatives/informatives.module').then(
          (m) => m.InformativesModule
        ),
    },
    {
      path: 'cursos',
      loadChildren: () =>
        import('src/app/utils/modules/courses/courses.module').then(
          (m) => m.CoursesModule
        ),
    },
    {
      path: 'notificacoes',
      loadChildren: () =>
        import(
          `${rootFolder}/modules/private/modules/notifications/notifications.module`
        ).then((m) => m.NotificationsModule),
    },
    {
      path: 'perfis',
      loadChildren: () =>
        import('src/app/utils/modules/profiles/profiles.module').then(
          (m) => m.ProfilesModule
        ),
    },
  ]
}


export function fetchPropertiesRoutes(isPublicManager: boolean): Routes {
  const rootFolder = isPublicManager ? publicManagerRootFolder : professionalRootFolder

  return [
    {
      path: '',
      component: PropertiesComponent,
      children: [
        {
          path: 'lista-matches',
          loadChildren: () => import(`${rootFolder}/modules/private/modules/properties/modules/matches/matches.module`).then(m => m.MatchesModule)
        },
        {
          path: '',
          loadChildren: () => import('src/app/utils/modules/properties/properties.module').then(m => m.PropertiesModule)
        },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ]
    }
  ]
};

