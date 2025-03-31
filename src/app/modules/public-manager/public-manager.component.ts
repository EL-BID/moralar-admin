import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-public-manager',
  templateUrl: './public-manager.component.html',
  styleUrls: ['./public-manager.component.sass'],
})
export class PublicManagerComponent {
  constructor(readonly titleService: Title) {
    titleService.setTitle('Gestor Público');
  }
}
