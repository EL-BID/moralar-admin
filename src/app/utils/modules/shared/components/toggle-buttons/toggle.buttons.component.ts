import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle.buttons.component.html',
  styleUrls: ['./toggle.buttons.component.sass']
})
export class ToggleButtonsComponent { 
  @Input() title: string = 'choose one option';
  @Input() selected: boolean | null = null;
  @Input() errorMessage: string = 'Por favor, escolha uma opção acima';
  @Input() submited: boolean = false;
  @Output()
  onChangeSelection: EventEmitter<boolean | null> = new EventEmitter();

  toggleActive( state: boolean ): void {
    this.selected = state;
    this.onChangeSelection.emit(state);
  }
}
