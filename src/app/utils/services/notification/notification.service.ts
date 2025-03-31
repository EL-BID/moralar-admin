import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormDataModel, generateFormData } from '../../functions/generate-form-data.function';
import { HttpService } from '../http/http.service';
import { Enums } from '../../functions/enums.function';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private httpService: HttpService,
  ) { }
  public setNotificationsCount(rol: string, userId: string): void {
    const formDataModel: FormDataModel = {
      columns: [
        { data: 'created', name: 'Created', searchable: false },
        { data: 'title', name: 'Title', searchable: true },
        { data: 'description', name: 'Description', searchable: true },
      ],
      page: 0,
      pageSize: 10,
      search: {
        search: '',
        onlyNoRead: true,
        forGestor: Enums.getForTypeRole(rol) == 2,
        forTTS: Enums.getForTypeRole( rol ) == 1,
        forAdministrator: Enums.getForTypeRole( rol ) == 3,
        userId: userId,
        setRead: false,
      },
      order: {
        column: '0',
        direction: 'desc',
      },
    };
    this.httpService
      .post( `Notification/CountNotifications`, generateFormData( formDataModel ) )
      .subscribe( ( response: any ) => {
        const count: number = response.data;
        sessionStorage.setItem(
          `countNotifications.${Enums.getForTypeRole(rol)}`, count.toString() );
      } );
  }

  public SetHasBeenRead( id: string, userId: string ): void {
    this.httpService
      .post(`Notification/SetHasBeenRead/${id}/${userId}`, {
      })
      .subscribe( ( response: any ) => {
      } );
  }
}
