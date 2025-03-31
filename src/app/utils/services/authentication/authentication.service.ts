import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  profileRouter = '';
  constructor(userService: UserService, private router: Router) {
    const typeProfile = ['gestor-publico', 'profissional', 'administrador'];
    userService.user.subscribe((user) => {
      if (user) this.profileRouter = typeProfile[user.typeProfile];
    });
  }

  setAuthentication(authentication: any, rememberMe: boolean): void {
    authentication = JSON.stringify(authentication);
    rememberMe
      ? localStorage.setItem('authentication', authentication)
      : sessionStorage.setItem('authentication', authentication);
  }

  getAuthentication(): any {
    const localStorageAuthentication = localStorage.getItem('authentication');
    const sessionStorageAuthentication =
      sessionStorage.getItem('authentication');
    return (
      JSON.parse(localStorageAuthentication) ||
      JSON.parse(sessionStorageAuthentication) ||
      null
    );
  }

  unsetAuthentication(): void {
    localStorage.removeItem('authentication');
    sessionStorage.removeItem('authentication');
    this.router.navigate([`/${this.profileRouter}`]);
  }

  isLoggedIn(): boolean {
    const localStorageAuthentication = localStorage.getItem('authentication');
    const sessionStorageAuthentication =
      sessionStorage.getItem('authentication');
    return localStorageAuthentication || sessionStorageAuthentication
      ? true
      : false;
  }
}
