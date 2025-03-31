import { Pipe, PipeTransform } from '@angular/core';
import { typeProperty } from 'src/app/core/mocks/typeProperty';

@Pipe({
  name: 'typeProperty',
})
export class TypePropertyPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return value < typeProperty.length
      ? typeProperty[value]
      : 'Tipo de imóvel não mapeado';
  }
}
