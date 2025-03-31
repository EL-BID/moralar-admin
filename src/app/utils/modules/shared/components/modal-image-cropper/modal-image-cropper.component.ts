import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-image-cropper',
  templateUrl: './modal-image-cropper.component.html',
  styleUrls: ['./modal-image-cropper.component.sass']
})
export class ModalImageCropperComponent {

  @Input()
  modalImageCropperFile: File;

  @Input()
  modalImageCropperAspectRatio = 1;

  modalImageCropperImageCropped: string;

  faTimes = faTimes;

  constructor(
    public ngbActiveModal: NgbActiveModal
  ) { }

  dataUriToBlob(dataUri): Promise<Blob> {
    return fetch(dataUri)
      .then((response: any) => response.blob());
  }

}
