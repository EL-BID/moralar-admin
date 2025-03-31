import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { QuestionnariesAvaliableComponent } from './questionnaries-avaliable.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnariesAvaliableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnariesAvaliableRoutingModule { }
