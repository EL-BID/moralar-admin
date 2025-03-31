import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { ListContainerClass } from 'src/app/utils/classes/list-container.class';
import { FormDataModel } from 'src/app/utils/functions/generate-form-data.function';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { UserService } from 'src/app/utils/services/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/utils/services/notification/notification.service';
import { RoutesFunction } from 'src/app/utils/functions/routes-function';
import { Enums } from 'src/app/utils/functions/enums.function';
import { NotificationsFunction } from 'src/app/utils/functions/notifications.function';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.sass'],
})
export class MyNotificationsComponent
  extends ListContainerClass
  implements OnInit
{
  @Input() abstract = false;
  @Input() modeBell: boolean = false;
  @Input() for: number | null = null;

  @Output() loaded = new EventEmitter<void>();

  UrlSeelAll = '/gestor-publico/app/notificacoes';

  formDataModel: FormDataModel = {
    columns: [
      { data: 'created', name: 'Created', searchable: false },
      { data: 'title', name: 'Title', searchable: true },
      { data: 'description', name: 'Description', searchable: true },
      { data: 'DateViewed', name: 'DateViewed', searchable: false },
    ],
    page: 1,
    pageSize: 10,
    search: {
      search: '',
      forGestor: this.for == 1,
      forTTS: this.for == 2,
      forAdministrator: this.for == 3,
      setRead: false,
      onlyNoRead: false,
      // dateViewed: 'null',
    },
    order: {
      column: '0',
      direction: 'desc',
    },
  };

  uri = 'Notification';
  loggedUser!: any;

  constructor(
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _httpService: HttpService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    super(_activatedRoute, _router, _httpService);
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.setQueryParams(params);
      this.onLoadFilter();
    });
  }

  public notificationHaveRedirect( module: string ): boolean {
    return NotificationsFunction.notificationHaveRedirect(module);
  }

  public notificationDontViewed( seenBy: string | null ): boolean {
    const userId: string | null = this.loggedUser.id;
    return NotificationsFunction.notificationDontViewed(seenBy, userId);
  }


  public notificationRedirect(index: number, module: string,
     id: string, notViewed: boolean ): void {
    if ( module != null ) {
      
      const rolId: number = Enums.getRolNumber(this.loggedUser.typeProfile);

      if (sessionStorage.getItem( `countNotifications.${ rolId }` ) && notViewed) {
        const count: number = Number.parseInt(sessionStorage.getItem(`countNotifications.${rolId}`));
        sessionStorage.setItem( `countNotifications.${ rolId }`, (count - 1) > 0 ? 
        (count - 1).toString() : "0");
      }
      
      if (notViewed) {
        const now = Math.floor( Date.now() / 1000 );
        this.list[index].dateViewed = now;
        this.list[index].seenBy = id;

        this.notificationService.SetHasBeenRead( id, this.loggedUser.id);
      }

      const path = module.split( '.' )[ 1 ];
      const id1 = module.split( '/' )[ 1 ];
      const id2 = module.split( '/' )[ 2 ];

      switch ( path ) {
        case 'agendamento':
          this._router.navigate( [
            RoutesFunction.getPathIndepentTheRole( '', this.loggedUser.typeProfile ) ] ).then( () => {
            setTimeout( () => {
              this._router.navigate( [
                RoutesFunction.getPathIndepentTheRole(
                  'agendamentos', this.loggedUser.typeProfile ), id1
              ] );
          }, 200 ) });
          break;
        case 'quest-sended':
          this._router.navigate( [ 
            RoutesFunction.getPathIndepentTheRole( '', this.loggedUser.typeProfile ) ]).then(() =>  {
            setTimeout(() => {
              this._router.navigate( [
                RoutesFunction.getPathIndepentTheRole(
                  `questionarios/disponiveis/${ id1 }/${ id2 }`, this.loggedUser.typeProfile )
              ] );
            }, 200);
          }
          )
          break;
        case 'match-selled': 
          this._router.navigate( [
            RoutesFunction.getPathIndepentTheRole( '', this.loggedUser.typeProfile ) ] ).then( () => {
              setTimeout( () => {
                this._router.navigate( [
                  RoutesFunction.getPathIndepentTheRole(
                    `matches/${ id1 }?residencialCode=${ id2 }`, this.loggedUser.typeProfile )
                ] );
              }, 200 );
            }
            );
          break;
      }
    }
  }
  

  cleanAllReadAndRedirect(): void {
    setTimeout(() => {
      this._router.navigate( [ this.UrlSeelAll ] );      
    }, 200);
  }

  onLoadFilter(): void {
    this.userService.user
      .pipe(takeUntil(this.onDestroy))
      .subscribe((user: any) => {
        if (user) {
          this.loggedUser = user;
          this.switchRoleSearch();

          if (this.abstract) {
            this.formDataModel.search.onlyNoRead = false;
          }
          if (!this.abstract) {
            this.formDataModel.search.setRead = true;
          }

          if (this.modeBell) {
            this.formDataModel.pageSize = 5;
          }

          this.formDataModel.order = {
            column: '3',
            direction: 'desc',
          };

          if (this.modeBell) {
            this.notificationService.setNotificationsCount(
              this.loggedUser.typeProfile, this.loggedUser.id );
          }
          this.getList();
        }
      });
  }

  urlImage(name: string): string {
    return name
      ? `${environment.baseUrl}/${environment.assetPath}${name}`
      : 'assets/images/no-image.png';
  }

  private switchRoleSearch(): void {
    switch ( this.loggedUser.typeProfile ) {
      case "Gestor":
        this.formDataModel.search.forGestor = true;
        this.formDataModel.search.forTTS = false;
        this.formDataModel.search.forAdministrator = false;

        this.UrlSeelAll = '/gestor-publico/app/notificacoes';
        break;
      case "TTS":
        this.formDataModel.search.forGestor = false;
        this.formDataModel.search.forTTS = true;
        this.formDataModel.search.forAdministrator = false;
        this.UrlSeelAll = '/profissional/app/notificacoes'
        break;
      default:
        this.formDataModel.search.forGestor = false;
        this.formDataModel.search.forTTS = false;
        this.formDataModel.search.forAdministrator = true;
        this.UrlSeelAll = '/administrador/app/notificacoes'
    }
  }
}
