import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Compressor from 'compressorjs';

interface CompressFileOptions {
  maxWidth?: number;
  maxHeight?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CompressorService {
  compressFile(file: Blob, options?: CompressFileOptions): Observable<Blob> {
    return new Observable((subscriber) => {
      const compressor = new Compressor(file, {
        maxWidth: (options && options.maxWidth) || Infinity,
        maxHeight: (options && options.maxHeight) || Infinity,
        quality: 1,
        convertSize: 0,
        success: (file: Blob) => {
          subscriber.next(file);
          subscriber.complete();
        },
      });
    });
  }
}
