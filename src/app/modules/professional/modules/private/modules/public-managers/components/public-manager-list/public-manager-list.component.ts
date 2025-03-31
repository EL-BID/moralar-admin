import { Component, Output, EventEmitter } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-public-manager-list',
  templateUrl: './public-manager-list.component.html',
  styleUrls: ['./public-manager-list.component.sass']
})
export class PublicManagerListComponent extends ListComponentClass {

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
