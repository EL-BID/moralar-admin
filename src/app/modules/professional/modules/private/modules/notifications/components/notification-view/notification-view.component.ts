import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.sass']
})
export class NotificationViewComponent {
  @Input()
  notification: any;

}
