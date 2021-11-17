import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgbModalModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaskModule } from 'ngx-mask';
import { CustomCurrencyMaskConfig } from 'src/app/core/conf/maskCurrency';

import { MegaleiosFormsModule } from '../megaleios-forms/megaleios-forms.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressViewComponent } from './components/address-view/address-view.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { ListPaginationComponent } from './components/list-pagination/list-pagination.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalImageCropperComponent } from './components/modal-image-cropper/modal-image-cropper.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbdSortableHeaderDirective } from './directives/ngbd-sortable-header/ngbd-sortable-header.directive';
//pipes
import { TypePropertyPipe } from './pipes/TypeProperty.pipe';

// components
const components = [
  CardComponent,
  ButtonComponent,
  ListPaginationComponent,
  ModalComponent,
  ModalConfirmComponent,
  AddressFormComponent,
  AddressViewComponent,
  ImageUploadComponent,
  ModalImageCropperComponent,
  ImportFileComponent,
];

// modules
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  CurrencyMaskModule,
  NgxMaskModule,
  NgbPaginationModule,
  ImageCropperModule,
  HttpClientModule,
  FontAwesomeModule,
  MegaleiosFormsModule,
  NgbModalModule,
];

// directives
const directives = [NgbdSortableHeaderDirective];

//pipes
const pipes = [TypePropertyPipe];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [...modules],
  exports: [...modules, ...components, ...directives, ...pipes],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class SharedModule {}
