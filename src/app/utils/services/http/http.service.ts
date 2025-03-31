import { MegaleiosAlertService } from 'src/app/utils/modules/megaleios-alert/megaleios-alert.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private baseUrl: string = environment.baseUrl;

  // constructor(
  //   private httpClient: HttpClient
  // ) { }

  // get(route: string, options?: any): Observable<any> {
  //   return options
  //     ? this.httpClient.get(`${this.baseUrl}/api/v1/${route}`, options)
  //     : this.httpClient.get(`${this.baseUrl}/api/v1/${route}`);
  // }

  // post(route: string, value: any, options?: any): Observable<any> {
  //   return options
  //     ? this.httpClient.post(`${this.baseUrl}/api/v1/${route}`, value, options)
  //     : this.httpClient.post(`${this.baseUrl}/api/v1/${route}`, value);
  // }

  // download(route: string): Observable<any> {
  //   return this.httpClient.post(`${this.baseUrl}/api/v1/${route}`,
  //     {},
  //     {
  //       responseType: 'blob',
  //     });
  // }

  private url: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private megaleiosAlertService: MegaleiosAlertService
  ) {}

  get(route: string, options?: any): Observable<any> {
    return options
      ? this.http.get(`${this.url}/api/v1/${route}`, options)
      : this.http.get(`${this.url}/api/v1/${route}`).pipe(take(1), tap());
  }

  getByAssetsAngular( route: string, options?: any ): Observable<any> {
    return this.http.get( `/assets/${ route }` ).pipe( take( 1 ), tap() );
  }

  post(
    route: string,
    value: any,
    showMessage = false,
    options?: any
  ): Observable<any> {
    return options
      ? this.http.post(`${this.url}/api/v1/${route}`, value, options)
      : this.http.post(`${this.url}/api/v1/${route}`, value).pipe(
          take(1),
          tap(
            ({ message }: any) => {
              if (showMessage) this.megaleiosAlertService.success(message);
            },
            ({ message }) => this.megaleiosAlertService.error(message)
          )
        );
  }

  export(route: string, value: any): Observable<any> {
    return this.http
      .post(`${this.url}/api/v1/${route}`, value, {
        responseType: 'blob',
      })
      .pipe(
        take(1),
        catchError(({ message }) => {
          this.megaleiosAlertService.error(message);
          return of(message);
        })
      );
  }

  patch(
    route: string,
    value: any,
    showMessage = false,
    options?: any
  ): Observable<any> {
    return options
      ? this.http.patch(`${this.url}/api/v1/${route}`, value, options)
      : this.http.patch(`${this.url}/api/v1/${route}`, value).pipe(
          take(1),
          tap(
            ({ message }: any) => {
              if (showMessage) this.megaleiosAlertService.success(message);
            },
            ({ message }) => this.megaleiosAlertService.error(message)
          )
        );
  }

  delete(route: string, options?: any): Observable<any> {
    return options
      ? this.http.delete(`${this.url}/api/v1/${route}`, options)
      : this.http.delete(`${this.url}/api/v1/${route}`).pipe(take(1), tap());
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    const headers = new HttpHeaders({
      processData: 'false',
      ContentType: 'multipart/form-data',
    });
    formData.append('file', file, file.name);
    return this.http
      .post(this.url + '/api/v1/File/Upload', formData, {
        headers,
      })
      .pipe(take(1));
  }

  download(route: string): Observable<any> {
    return this.http
      .post(
        `${this.url}/api/v1/${route}`,
        {},
        {
          responseType: 'blob',
        }
      )
      .pipe(take(1));
  }
}
