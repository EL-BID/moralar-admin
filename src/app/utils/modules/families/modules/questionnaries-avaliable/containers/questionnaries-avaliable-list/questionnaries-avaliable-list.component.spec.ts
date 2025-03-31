import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnariesAvaliableListComponent } from './questionnaries-avaliable-list.component';

describe('QuestionnariesAvaliableListComponent', () => {
  let component: QuestionnariesAvaliableListComponent;
  let fixture: ComponentFixture<QuestionnariesAvaliableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnariesAvaliableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnariesAvaliableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
