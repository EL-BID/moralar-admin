import { Component, EventEmitter, Output } from '@angular/core';
import { ListComponentClass } from 'src/app/utils/classes/list-component.class';
import { PROPERTY_TYPE_LIST } from 'src/app/utils/interfaces/properties.interface';
import { sortBy } from 'lodash';
import { NotificationsFunction } from 'src/app/utils/functions/notifications.function';
import { UserService } from 'src/app/utils/services/user/user.service';
import { Enums } from 'src/app/utils/functions/enums.function';
import { NotificationService } from 'src/app/utils/services/notification/notification.service';
@Component( {
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: [ './notification-list.component.sass' ]
} )
export class NotificationListComponent extends ListComponentClass {
  propertyTypeList: any[] = sortBy( PROPERTY_TYPE_LIST, 'name' );
  @Output()
  blockUnblock: EventEmitter<any> = new EventEmitter();

  loggedUser: any;

  readable = [];

  constructor( private userService: UserService,
    private notificationService: NotificationService ) {
    super();
    this.userService.user
      .subscribe( ( user: any ) => {
        if ( user ) {
          this.loggedUser = user;
        }
      } );
  }

  handleBlockUnblock( value: any ): void {
    value.preventDefault();
    this.blockUnblock.emit( {
      targetId: value.target.value,
      block: !value.target.checked,
      reason: null
    } );
  }

  public applyReadNotification(index: number, module: string,
    id: string, notViewed: boolean ): void {
    if ( module != null && !this.readable[ index ] ) {

      const rolId: number = Enums.getRolNumber( this.loggedUser.typeProfile );

      if ( sessionStorage.getItem( `countNotifications.${ rolId }` ) && notViewed ) {
        const count: number = Number.parseInt( sessionStorage.getItem( `countNotifications.${ rolId }` ) );
        sessionStorage.setItem( `countNotifications.${ rolId }`, ( count - 1 ) > 0 ?
          ( count - 1 ).toString() : "0" );
      }

      if ( notViewed ) {
        const now = Math.floor( Date.now() / 1000 );
        this.list[ index ].dateViewed = now;
        this.list[ index ].seenBy = id;

        this.readable[ index ] = true;

        this.notificationService.SetHasBeenRead( id, this.loggedUser.id );
      }
    }
  }

  public notificationDontViewed( seenBy: string | null, module: string | null ): boolean {
    const userId: string | null = this.loggedUser.id;
    return NotificationsFunction.notificationDontViewed(
      seenBy, userId );
  }

  public notificationHaveRedirect( module: string ): boolean {
    return NotificationsFunction.notificationHaveRedirect( module );
  }
}
