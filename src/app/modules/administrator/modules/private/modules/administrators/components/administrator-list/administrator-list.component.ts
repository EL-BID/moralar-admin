import { Component, Output, EventEmitter } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.sass']
})
export class AdministratorListComponent extends ListComponentClass {

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
