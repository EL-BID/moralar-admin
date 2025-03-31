import { Pipe, PipeTransform } from '@angular/core';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

@Pipe( {
  name: 'relativeDate'
} )
export class RelativeDatePipe implements PipeTransform {
  transform( value: string | Date ): string {
    const date = typeof value === 'string' ? parseISO( value ) : value;

    if ( isToday( date ) ) {
      return 'Today';
    } else if ( isYesterday( date ) ) {
      return 'Yesterday';
    } else {
      return format( date, "dd/MM/yyyy HH:mm" ); // Adjust the format as needed
    }
  }
}
