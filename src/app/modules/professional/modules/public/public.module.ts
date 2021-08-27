import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from 'src/app/modules/administrator/modules/public/public-routing.module';

// containers
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    // containers
    PublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
