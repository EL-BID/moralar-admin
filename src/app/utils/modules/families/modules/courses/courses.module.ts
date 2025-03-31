import { NgModule } from '@angular/core';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { PropertiesModule } from '../../../properties/properties.module';
import { FamiliesModule } from '../../families.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

// containers
// components
import Timeline = gsap.core.Timeline;

@NgModule({
  declarations: [
    // containers
    CoursesComponent,
    CoursesListComponent,
    // components
    CourseListComponent,
  ],
  exports: [CourseListComponent],
  imports: [
    CoursesRoutingModule,
    // modules
    NgbDropdownModule,
    SharedModule,
    NgbAccordionModule,
    FontAwesomeTestingModule,
    FamiliesModule,
    PropertiesModule,
  ],
})
export class CoursesModule {}
