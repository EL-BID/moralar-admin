import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseListSearchComponent } from './components/course-list-search/course-list-search.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { CoursesAddComponent } from './containers/courses-add/courses-add.component';
import { CoursesDetailsComponent } from './containers/courses-details/courses-details.component';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

// consts
@NgModule({
  declarations: [
    CoursesComponent,
    // containers
    CoursesListComponent,
    CoursesAddComponent,
    CoursesDetailsComponent,
    // components
    CourseListComponent,
    CourseListSearchComponent,
    CourseFormComponent,
    CourseViewComponent,
  ],
  imports: [CoursesRoutingModule, SharedModule],
  exports: [CoursesDetailsComponent, CourseListComponent],
})
export class CoursesModule {}
