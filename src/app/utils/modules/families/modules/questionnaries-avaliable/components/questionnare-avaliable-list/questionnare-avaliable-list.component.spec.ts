import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnareAvaliableListComponent } from './questionnare-avaliable-list.component';

describe('QuestionnareAvaliableListComponent', () => {
  let component: QuestionnareAvaliableListComponent;
  let fixture: ComponentFixture<QuestionnareAvaliableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnareAvaliableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnareAvaliableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
