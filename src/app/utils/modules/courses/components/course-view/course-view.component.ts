import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.sass'],
})
export class CourseViewComponent implements OnChanges {
  @Input()
  course: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.course) {
      this.course.enrolled = [
        {
          fullName: 'Joel dos Santos Silva',
          cpf: '04967048188',
          waiting: true,
        },
        {
          fullName: 'Ana dos Santos Silva',
          cpf: '01067048188',
          waiting: false,
        },
        { fullName: 'Neiely Sara', cpf: '04417048188', waiting: true },
      ];
    }
  }
}
