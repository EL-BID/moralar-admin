import {Component, EventEmitter, Output} from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import { PROPERTY_TYPE_LIST } from 'src/app/utils/interfaces/properties.interface';
import { sortBy } from 'lodash';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.sass']
})
export class NotificationListComponent extends ListComponentClass {
  propertyTypeList: any[] = sortBy(PROPERTY_TYPE_LIST, 'name');
  @Output()
  blockUnblock: EventEmitter<any> = new EventEmitter();

  handleBlockUnblock(value: any): void {
    value.preventDefault();
    this.blockUnblock.emit({
      targetId: value.target.value,
      block: !value.target.checked,
      reason: null
    });
  }
}
