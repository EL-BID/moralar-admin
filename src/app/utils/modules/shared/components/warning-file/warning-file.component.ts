import { Component, Input } from '@angular/core';
import { WarningFile } from 'src/app/utils/interfaces/Files/WarningFile';

@Component({
  selector: 'app-warning-file',
  templateUrl: './warning-file.component.html',
  styleUrls: ['./warning-file.component.css']
})
export class WarningFileComponent {
  @Input() open: boolean;
  @Input() errorsList: WarningFile[] | null;

  constructor() { 
    console.log(this.errorsList);
  }
}
