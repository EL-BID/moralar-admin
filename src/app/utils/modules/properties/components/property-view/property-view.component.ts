import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  propertyTypeToString,
  propertyRegularizationToString,
  propertyGasInstallationToString,
} from 'src/app/utils/functions/properties.function';
import { environment } from '@env/environment';
import { ImageGalleryComponent } from '../../../shared/components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyViewComponent {
  public baseUrl: string = environment.baseUrl;
  public assetsPath: string = environment.assetPath;
  @Input()
  property: any;

  @ViewChild( ImageGalleryComponent ) childComponent!: ImageGalleryComponent

  public triggerChildLightbox( index: any ): void {
    this.childComponent.openLightbox( index );
  }

  public getProjectPath(project: string): string {
    return project.includes( "http" ) ? project : `${this.baseUrl}${this.assetsPath}/${project}`;
  }


  propertyTypeToString = propertyTypeToString;
  propertyRegularizationToString = propertyRegularizationToString;
  propertyGasInstallationToString = propertyGasInstallationToString;
}
