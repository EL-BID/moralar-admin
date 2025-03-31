import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informative-view',
  templateUrl: './informative-view.component.html',
  styleUrls: ['./informative-view.component.sass']
})
export class InformativeViewComponent {
  @Input()
  informative: any;

}
