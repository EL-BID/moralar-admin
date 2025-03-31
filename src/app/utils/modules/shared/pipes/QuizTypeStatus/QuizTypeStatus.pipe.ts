import { Pipe, PipeTransform } from '@angular/core';
import { quizTypeStatus } from 'src/app/core/mocks/quizTypeStatus';

@Pipe({
  name: 'quizTypeStatus',
})
export class QuizTypeStatusPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return value < quizTypeStatus.length
      ? quizTypeStatus[value]
      : 'Status não mapeado';
  }
}
