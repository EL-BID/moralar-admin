import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    // containers
    PublicComponent,
  ],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
