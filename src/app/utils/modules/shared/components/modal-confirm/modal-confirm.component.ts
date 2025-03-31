import { Component, Input } from '@angular/core';
import { ModalConfirmData } from './modal-confirm.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-decision',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.sass']
})
export class ModalConfirmComponent {

  @Input()
  modalConfirmData: ModalConfirmData;

  constructor(
    public ngbActiveModal: NgbActiveModal
  ) { }

}
