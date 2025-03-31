import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { ErrorInterceptor } from 'src/app/utils/interceptors/error/error.interceptor';
import { JsonWebTokenInterceptor } from 'src/app/utils/interceptors/json-web-token/json-web-token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MegaleiosAlertModule } from './utils/modules/megaleios-alert/megaleios-alert.module';
import { SharedModule } from './utils/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';

// locale
registerLocaleData(localePt, 'pt');

// modules
// interceptors
// containers
@NgModule({
  declarations: [
    // containers
    AppComponent,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    // modules
    HttpClientModule,
    MegaleiosAlertModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,

    CommonModule,
    GalleryModule,
    LightboxModule,
    ImageViewerModule
  ],
  providers: [
    // locale
    { provide: LOCALE_ID, useValue: 'pt' },
    // interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonWebTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
