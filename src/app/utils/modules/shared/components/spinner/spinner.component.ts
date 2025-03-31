import { Component, Input } from '@angular/core';
import { WarningFile } from 'src/app/utils/interfaces/Files/WarningFile';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() typeSpinner = 'normal';
  @Input() spinner = {
    open: false,
    message: "Validando o arquivo..."
  };

  constructor() { 
  }
}
