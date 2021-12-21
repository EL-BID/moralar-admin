import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent {

  @Input() imagePath: string;
  @Input() label: string;

  constructor(
    public modalService: NgbModal
  ) {}

  openModal(content): void {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }
}
