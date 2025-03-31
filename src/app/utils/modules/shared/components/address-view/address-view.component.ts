import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.sass']
})
export class AddressViewComponent {

  @Input()
  address: any;

}
