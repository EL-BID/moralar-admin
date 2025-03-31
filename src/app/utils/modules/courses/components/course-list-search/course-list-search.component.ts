import { Component } from '@angular/core';
import { ListSearchComponentClass } from 'src/app/utils/classes/list-search-component.class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-course-list-search',
  templateUrl: './course-list-search.component.html',
  styleUrls: ['./course-list-search.component.sass']
})
export class CourseListSearchComponent extends ListSearchComponentClass {

  constructor(
    formBuilder: FormBuilder
  ) {
    super();
    this.listSearchForm = formBuilder.group({
      search: [''],
      startDate: [''],
      endDate: [''],
    });
  }

}
