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
import { AgmCoreModule } from '@agm/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MegaleiosFormsModule } from '../megaleios-forms/megaleios-forms.module';
//Components
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
import { DateRangeComponent } from './components/date-range/date-range.component';
//Directives
import { NgbdSortableHeaderDirective } from './directives/ngbd-sortable-header/ngbd-sortable-header.directive';
//pipes
import { QuizTypeStatusPipe } from './pipes/QuizTypeStatus/QuizTypeStatus.pipe';
import { TypePropertyPipe } from './pipes/TypeProperty/TypeProperty.pipe';
import { TypeStatusResidencialPropertyPipe } from './pipes/TypeStatusResidencialProperty/TypeStatusResidencialProperty.pipe';
import { ImageComponent } from './components/image/image.component';
import { ScheduleListSearchComponent } from './components/schedule-list-search/schedule-list-search.component';

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
  DateRangeComponent,
  ImageComponent,
  ScheduleListSearchComponent,
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
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialogModule,
];

// directives
const directives = [NgbdSortableHeaderDirective];

//pipes
const pipes = [
  TypePropertyPipe,
  QuizTypeStatusPipe,
  TypeStatusResidencialPropertyPipe,
];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [
    ...modules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgTHSKwA4tLRf5C3581utRefU0Botycgo',
      libraries: ['places'],
    }),
  ],
  exports: [...modules, AgmCoreModule, ...components, ...directives, ...pipes],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class SharedModule {}
