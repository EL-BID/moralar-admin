import { Component, OnInit } from '@angular/core';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';

@Component({
  selector: 'app-matches-details',
  templateUrl: './matches-details.component.html',
  styleUrls: ['./matches-details.component.sass']
})
export class MatchesDetailsComponent extends OnDestroyClass implements OnInit {

  property: any = { };

  ngOnInit(): void {
    //This is intentional
  }

}
