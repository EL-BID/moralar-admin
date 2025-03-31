import {
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  OnInit,
  Input
} from "@angular/core";
import { AbstractControl } from '@angular/forms';
import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize,
  ImageItem
} from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
import { ImageGalleryData } from 'src/app/utils/interfaces/Files/ImageGalleryData';

@Component( {
  selector: "app-image-gallery",
  templateUrl: "./image-gallery.component.html",
  styleUrls: [ "./image-gallery.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ImageGalleryComponent implements OnInit {
  items: GalleryItem[];
  @ViewChild( "itemTemplate", { static: true } ) itemTemplate: TemplateRef<any>;

  @Input() photosFormControls: AbstractControl[] = [];
  @Input() photos: any[] = [];

  constructor( public gallery: Gallery, public lightbox: Lightbox ) { }

  openLightbox( index: number ): void {
    this.lightbox.open( index );
  }

  ngOnInit() {
    if (this.photosFormControls.length > 0) {
      this.renderImages(this.photosFormControls);
    }
    if (this.photos.length > 0) {
      this.renderImages( this.photos );
    }
  }

  private renderImages(data: any) {
    this.items = data.map((item: ImageGalleryData) => {
      const value: string = item && typeof item.value != "undefined" ? item.value.imageUrl : item.imageUrl;

      const imageUrl = ( item && typeof item.value != "undefined" && item.value.imageBase64 ) ? item.value.imageBase64 : value;

      return new ImageItem( { src: imageUrl, thumb: imageUrl, type: "imageViewer" } )
      
    } );

    const lightboxRef = this.gallery.ref( "lightbox" );

    lightboxRef.setConfig( {
    
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Bottom,
      itemTemplate: this.itemTemplate,
      gestures: false,
      loop: true
    } );

    lightboxRef.load( this.items );
  }
}
