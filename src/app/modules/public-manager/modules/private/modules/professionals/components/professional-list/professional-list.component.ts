import { Component, Output, EventEmitter } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.sass']
})
export class ProfessionalListComponent extends ListComponentClass {

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
