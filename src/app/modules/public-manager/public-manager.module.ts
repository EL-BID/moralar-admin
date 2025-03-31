import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicManagerRoutingModule } from './public-manager-routing.module';

// containers
import { PublicManagerComponent } from './public-manager.component';


@NgModule({
  declarations: [
    // containers
    PublicManagerComponent
  ],
  imports: [
    CommonModule,
    PublicManagerRoutingModule
  ]
})
export class PublicManagerModule { }
