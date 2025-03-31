import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireListSearchComponent } from './questionnaire-list-search.component';

describe('QuestionnaireListSearchComponent', () => {
  let component: QuestionnaireListSearchComponent;
  let fixture: ComponentFixture<QuestionnaireListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
