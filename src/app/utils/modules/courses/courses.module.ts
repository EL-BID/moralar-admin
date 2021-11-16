import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MegaleiosFormsModule } from '../megaleios-forms/megaleios-forms.module';
import { SharedModule } from '../shared/shared.module';
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CourseListSearchComponent } from './components/course-list-search/course-list-search.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesAddComponent } from './containers/courses-add/courses-add.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesDetailsComponent } from './containers/courses-details/courses-details.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { CustomCurrencyMaskConfig } from 'src/app/core/conf/maskCurrency';
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
  imports: [
    CommonModule,
    CoursesRoutingModule,
    // modules
    ReactiveFormsModule,
    MegaleiosFormsModule,
    SharedModule,
    CurrencyMaskModule,
  ],
  exports: [CoursesDetailsComponent, CourseListComponent],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
  ],
})
export class CoursesModule {}
