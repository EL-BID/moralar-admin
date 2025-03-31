import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import {CoursesComponent} from './courses.component';
import {CoursesListComponent} from './containers/courses-list/courses-list.component';
import {CoursesAddComponent} from './containers/courses-add/courses-add.component';
import {CoursesDetailsComponent} from './containers/courses-details/courses-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: '', component: CoursesListComponent },
      { path: 'adicionar', component: CoursesAddComponent },
      { path: ':courseId', component: CoursesDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
