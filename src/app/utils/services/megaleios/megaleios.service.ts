import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class MegaleiosService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  get(route: string, options?: any): Observable<any> {
    return options
      ? this.httpClient.get(`${this.baseUrl}/api/v1/${route}`, options)
      : this.httpClient.get(`${this.baseUrl}/api/v1/${route}`);
  }

  post(route: string, value: any, options?: any): Observable<any> {
    return options
      ? this.httpClient.post(`${this.baseUrl}/api/v1/${route}`, value, options)
      : this.httpClient.post(`${this.baseUrl}/api/v1/${route}`, value);
  }

}
