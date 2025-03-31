import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesDetailsComponent } from './questionnaires-details.component';

describe('QuestionnairesDetailsComponent', () => {
  let component: QuestionnairesDetailsComponent;
  let fixture: ComponentFixture<QuestionnairesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnairesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
