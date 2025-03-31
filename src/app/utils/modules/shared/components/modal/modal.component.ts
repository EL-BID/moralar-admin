import { Component, AfterViewInit, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements AfterViewInit {

  @Input()
  templateRef: TemplateRef<any>;

  @ViewChild('componentContainer', { read: ViewContainerRef })
  componentContainer: ViewContainerRef;

  faTimes = faTimes;

  constructor(
    public ngbActiveModal: NgbActiveModal,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.componentContainer.createEmbeddedView(this.templateRef);
    this.changeDetectorRef.detectChanges();
  }

}
