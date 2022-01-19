import { Component, Input } from '@angular/core';
import {
  propertyTypeToString,
  propertyRegularizationToString,
  propertyGasInstallationToString,
} from 'src/app/utils/functions/properties.function';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.sass'],
})
export class PropertyViewComponent {
  @Input()
  property: any;

  propertyTypeToString = propertyTypeToString;
  propertyRegularizationToString = propertyRegularizationToString;
  propertyGasInstallationToString = propertyGasInstallationToString;

  getUrlImage(name: string): string {
    return `${environment.baseUrl}/content/upload/${name}`;
  }
}
