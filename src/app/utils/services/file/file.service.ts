import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private httpService: HttpService,
  ) { }

  public async uploadProject( project: File, fileProject: File ): Promise<File> {
    return new Promise( ( resolve ) => {
      if ( fileProject ) {
        const formData = new FormData();
        formData.append( "file", fileProject );

        this.httpService.post( 'File/Upload', formData ).subscribe(
          ( { data } ) => {
            resolve( project + data.fileName );
          }, () => {
            resolve( project );
          } );
      } else {
        resolve( project );
      }
    } );
  }

  public async uploadFile( file: File): Promise<any> {
    return new Promise( async ( resolve ) => {
      var formData = new FormData();

      formData.append( 'files', file );
        this.httpService.post( 'File/Uploads', formData ).subscribe(
          ( { data } ) => {
            if (data != null) {
              resolve(data.fileNames[0])
            }
            resolve( null )
          }, ( { error } ) => {
            resolve(null)
          } );
    } );
  }

  public async uploadFiles( payloadPhoto: any[] ): Promise<any[]> {
    return new Promise( async ( resolve ) => {
      var formData = new FormData();

      if ( payloadPhoto.length > 0 && payloadPhoto.filter( ( x ) => x.file != null ).length > 0 ) {
        for ( let index = 0; index < payloadPhoto.length; index++ ) {
          formData.append( 'files', payloadPhoto[ index ].file );
        }
        if ( payloadPhoto.length > 0 ) {
          this.httpService.post( 'File/Uploads', formData ).subscribe(
            ( { data } ) => {
              payloadPhoto = payloadPhoto.map( ( x, i ) => {
                x.imageUrl = x.imageUrl + data.fileNames[ i ];
                return x;
              } )
              resolve( payloadPhoto )
            }, ( { error } ) => {
              resolve( payloadPhoto );
            } );
        } else {
          resolve( payloadPhoto );
        }
      } else {
        resolve( payloadPhoto );
      }
    } );
  }
}
