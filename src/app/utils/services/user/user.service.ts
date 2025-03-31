import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBehaviorSubject: BehaviorSubject<null | any> = new BehaviorSubject(null);

  get user() {
    return this.userBehaviorSubject.asObservable();
  }

  set user(user: any) {
    this.userBehaviorSubject.next(user);
  }

}
