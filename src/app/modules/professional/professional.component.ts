import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.sass'],
})
export class ProfessionalComponent {
  constructor(readonly titleService: Title) {
    titleService.setTitle('Profissional');
  }
}
