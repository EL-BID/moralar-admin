import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent {

  @Input() imagePath: any;
  @Input() label: string;
  @Input() small: boolean = false;

  @Output() triggerChildLightbox = new EventEmitter<number>();

  public isExpanded = false;
  constructor(
    public modalService: NgbModal
  ) {}

  public triggerLightbox( index: number ): void {
    this.triggerChildLightbox.emit( index );
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }

  openModal(content): void {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }
}
