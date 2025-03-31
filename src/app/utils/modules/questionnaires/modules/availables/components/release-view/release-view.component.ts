import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-release-view',
  templateUrl: './release-view.component.html',
  styleUrls: ['./release-view.component.sass']
})
export class ReleaseViewComponent {
  @Input()
  release: any;

  itsMultipleAnswer( answer: string ): boolean {
    const regex = /^{[^{}]+}(?:{[^{}]+})*$/;
    return regex.test( answer );
  }

  splitAnswers( answer: string ): string[] {
    // Check if the answer contains '{' and '}'
    if ( answer.includes( '{' ) && answer.includes( '}' ) ) {
      // Remove the leading and trailing braces and split by '}{'
      return answer.slice( 1, -1 ).split( '}{' );
    }
    // If no braces are found, return the answer as a single-element array
    return [ answer ];
  }

}
