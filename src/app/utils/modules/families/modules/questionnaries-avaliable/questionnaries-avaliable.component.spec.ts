import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnariesAvaliableComponent } from './questionnaries-avaliable.component';

describe('QuestionnariesAvaliableComponent', () => {
  let component: QuestionnariesAvaliableComponent;
  let fixture: ComponentFixture<QuestionnariesAvaliableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnariesAvaliableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnariesAvaliableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
