import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
