import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/utils/modules/shared/shared.module';

import { QuestionnaireFormComponent } from './components/questionnaire-form/questionnaire-form.component';
import { QuestionnaireListSearchComponent } from './components/questionnaire-list-search/questionnaire-list-search.component';
import { QuestionnaireListComponent } from './components/questionnaire-list/questionnaire-list.component';
import { QuestionnaireViewComponent } from './components/questionnaire-view/questionnaire-view.component';
import { ReleaseFormComponent } from './components/release-form/release-form.component';
import { QuestionnairesAddComponent } from './containers/questionnaires-add/questionnaires-add.component';
import { QuestionnairesDetailsComponent } from './containers/questionnaires-details/questionnaires-details.component';
import { QuestionnairesListComponent } from './containers/questionnaires-list/questionnaires-list.component';
import { ReleasesAddComponent } from './containers/releases-add/releases-add.component';
import { AvailablesModule } from './modules/availables/availables.module';
import { QuestionnairesRoutingModule } from './questionnaires-routing.module';
import { QuestionnairesComponent } from './questionnaires.component';

// modules
// containers
// components
@NgModule({
  declarations: [
    // containers
    QuestionnairesComponent,
    QuestionnairesListComponent,
    QuestionnairesAddComponent,
    QuestionnairesDetailsComponent,
    QuestionnairesAddComponent,
    ReleasesAddComponent,
    // components
    QuestionnaireListComponent,
    QuestionnaireListSearchComponent,
    QuestionnaireFormComponent,
    QuestionnaireViewComponent,
    ReleaseFormComponent,
  ],
  exports: [QuestionnaireListComponent],
  imports: [QuestionnairesRoutingModule, SharedModule, AvailablesModule],
})
export class QuestionnairesModule {}
