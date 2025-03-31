import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fetchPropertiesRoutes } from 'src/app/utils/modules/shared/routes/privateRoutes';
const routes: Routes = fetchPropertiesRoutes(false);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
