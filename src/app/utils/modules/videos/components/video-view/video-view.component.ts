import { Component, Input } from '@angular/core';
import { propertyTypeToString, propertyRegularizationToString, propertyGasInstallationToString } from 'src/app/utils/functions/properties.function';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.sass']
})
export class VideoViewComponent {

  @Input()
  video: any;

  propertyTypeToString = propertyTypeToString;
  propertyRegularizationToString = propertyRegularizationToString;
  propertyGasInstallationToString = propertyGasInstallationToString;

}
