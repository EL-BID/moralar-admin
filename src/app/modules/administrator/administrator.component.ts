import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.sass'],
})
export class AdministratorComponent {
  constructor(readonly titleService: Title) {
    titleService.setTitle('Administrador');
  }
}
