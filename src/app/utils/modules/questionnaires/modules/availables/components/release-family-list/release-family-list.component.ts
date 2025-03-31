import {Component, Output, EventEmitter, Input} from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';

@Component({
  selector: 'app-release-family-list',
  templateUrl: './release-family-list.component.html',
  styleUrls: ['./release-family-list.component.sass']
})
export class ReleaseFamilyListComponent extends ListComponentClass {

  @Output()
  listItemSelected: EventEmitter<any> = new EventEmitter();

}
