import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MegaleiosFormsService {

  controlClicked: Subject<any> = new Subject();

}
