import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import {VideosListComponent} from './containers/videos-list/videos-list.component';
import {VideosAddComponent} from './containers/videos-add/videos-add.component';
import {VideosDetailsComponent} from './containers/videos-details/videos-details.component';
import {VideosComponent} from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [
      { path: '', component: VideosListComponent },
      { path: 'adicionar', component: VideosAddComponent },
      { path: ':videoId', component: VideosDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
