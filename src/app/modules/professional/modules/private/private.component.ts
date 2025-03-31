import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import {
  faTachometerAlt,
  faHouseUser,
  faCalendarAlt,
  faIdCard,
  faHome,
  faStar,
  faMap,
  faVideo,
  faBell,
  faQuestionCircle,
  faBook,
  faBellSlash,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/utils/services/user/user.service';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { AuthenticationService } from 'src/app/utils/services/authentication/authentication.service';
import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.sass'],
})
export class PrivateComponent
  extends OnDestroyClass
  implements OnInit, OnDestroy
{
  sessionStorage: Storage;

  faTachometerAlt = faTachometerAlt;
  faHouseUser = faHouseUser;
  faCalendarAlt = faCalendarAlt;
  faIdCard = faIdCard;
  faHome = faHome;
  faStar = faStar;
  faMap = faMap;
  faVideo = faVideo;
  faBell = faBell;
  faQuestionCircle = faQuestionCircle;
  faBook = faBook;
  faBellSlash = faBellSlash;
  faUser = faUserAlt;

  public loaded: boolean = false;

  user: any;

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private authenticationService: AuthenticationService,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router
  ) {
    super();
    this.sessionStorage = window.sessionStorage;
  }

  ngOnInit(): void {
    this.userService.user
      .pipe(takeUntil(this.onDestroy))
      .subscribe((user: any) => {
        if (user) {
          this.user = user;
        } else {
          this.httpService
            .get('Profile/GetInfo')
            .pipe(takeUntil(this.onDestroy))
            .subscribe(({ data }: any) => {
              data.passwordCurrent = data.password;
              this.userService.user = data;
            });
        }
      });
  }

  public isLoaded() {
    this.loaded = true;
  }

  ngOnDestroy(): void {
    this.authenticationService.unsetAuthentication();
    this.userService.user = null;
    this.megaleiosAlertService.success('Você saiu com sucesso.');
    this.onDestroy.next();
  }

  logOut(): void {
    sessionStorage.clear()
    this.authenticationService.unsetAuthentication();
  }
}
