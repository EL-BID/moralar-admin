import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { PropertiesComponent } from './properties.component';
import { PropertiesListComponent } from './containers/properties-list/properties-list.component';
import { PropertiesAddComponent } from './containers/properties-add/properties-add.component';
import { PropertiesDetailsComponent } from './containers/properties-details/properties-details.component';
import { PropertiesEditComponent } from './containers/properties-edit/properties-edit.component';
//PropertiesEditComponent
const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      { path: '', component: PropertiesListComponent },
      { path: 'adicionar', component: PropertiesAddComponent },
      { path: ':propertyId', component: PropertiesDetailsComponent },
      { path: ':id/editar', component: PropertiesEditComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
