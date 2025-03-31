import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {

  @Input()
  buttonType: string;

  @Input()
  buttonClass?: string;

  @Input()
  buttonDisabled?: boolean;

  @Input()
  buttonLoading?: boolean;

}
