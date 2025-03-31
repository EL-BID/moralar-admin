import { OnDestroyClass } from './on-destroy.class';
import {
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  Directive,
} from '@angular/core';
import {
  NgbdSortableHeaderDirective,
  SortEvent,
} from 'src/app/utils/modules/shared/directives/ngbd-sortable-header/ngbd-sortable-header.directive';
import { IHideTableItems } from '../interfaces/HideTableItems';
import { Enums } from '../functions/enums.function';

@Directive()
export abstract class ListComponentClass extends OnDestroyClass {
  @Input() hideTableItems: IHideTableItems = {
    selectItem: false,
    details: false,
    lockUnlock: false,
  };

  @Input()
  list: any[] = [];

  @Input()
  listSelected: any[] = [];

  @ViewChildren(NgbdSortableHeaderDirective)
  listSortables: QueryList<NgbdSortableHeaderDirective>;

  @Output()
  listOrderChange: EventEmitter<any> = new EventEmitter();

  @Output()
  listItemSelected: EventEmitter<any> = new EventEmitter();

  handleSort({ column, direction }: SortEvent): void {
    this.listSortables.forEach((item) => {
      if (item.sortable !== column) {
        item.direction = '';
      }
    });
    this.listOrderChange.emit({ column, direction });
  }

  getTypeStatus( value: string ): number {
    return Enums.getTypestatus( value );
  }

  isChecked(item: any): boolean {
    let isChecked = false;
    let i = 0;
    while (isChecked === false && i < this.listSelected.length) {
      if (JSON.stringify(item) === JSON.stringify(this.listSelected[i])) {
        isChecked = true;
      }
      i++;
    }
    return isChecked;
  }
}
