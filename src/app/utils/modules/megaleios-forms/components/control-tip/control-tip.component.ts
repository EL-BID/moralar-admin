import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-tip',
  templateUrl: './control-tip.component.html',
  styleUrls: ['./control-tip.component.sass']
})
export class ControlTipComponent {

  @Input()
  control: FormControl;

}
