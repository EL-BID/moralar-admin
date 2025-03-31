import { Pipe, PipeTransform } from '@angular/core';
import { TypeStatusResidencialProperty } from 'src/app/core/mocks/typeStatusResidencialProperty';

@Pipe({
  name: 'typeStatusResidencialProperty',
})
export class TypeStatusResidencialPropertyPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return value < TypeStatusResidencialProperty.length
      ? TypeStatusResidencialProperty[value]
      : 'Tipo não mapeado';
  }
}
