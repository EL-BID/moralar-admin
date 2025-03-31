import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.sass']
})
export class NotificationViewComponent {
  @Input()
  notification: any;

  public baseUrl: string = environment.baseUrl;

  public getImagePath( imageUrl: string ): string {
    return imageUrl.includes( "http" ) ? imageUrl : `${ this.baseUrl }/content/upload/${ imageUrl }`;
  }

}
