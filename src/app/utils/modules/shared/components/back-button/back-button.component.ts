import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component( {
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: [ './back-button.component.sass' ]
} )
export class BackButtonComponent {

  @Input()
  text: string = "";

  previousUrl: string;
  constructor( private location: Location, private router: Router ) { }

  goBackFunction() {
    this.router.events
      .pipe( filter( event => event instanceof NavigationEnd ) )
      .subscribe( ( event: NavigationEnd ) => {

        console.log( 'prev:', event.url );
        this.previousUrl = event.url;
      } );

    this.location.back();
  }
}
