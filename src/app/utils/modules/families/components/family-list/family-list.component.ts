import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.sass'],
})
export class FamilyListComponent extends ListComponentClass {
  @Output()
  blockUnblock: EventEmitter<any> = new EventEmitter();

  handleBlockUnblock(value: any): void {
    value.preventDefault();
    this.blockUnblock.emit({
      targetId: value.target.value,
      block: !value.target.checked,
      reason: null,
    });
  }
}
