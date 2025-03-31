import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import {ProfilesAddComponent} from './containers/profiles-add/profiles-add.component';
import {ProfilesComponent} from './profiles.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesAddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
