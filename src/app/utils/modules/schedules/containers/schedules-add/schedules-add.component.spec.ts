import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesAddComponent } from './schedules-add.component';

describe('SchedulesAddComponent', () => {
  let component: SchedulesAddComponent;
  let fixture: ComponentFixture<SchedulesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
