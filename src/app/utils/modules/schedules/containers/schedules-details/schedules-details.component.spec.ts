import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDetailsComponent } from './schedules-details.component';

describe('SchedulesDetailsComponent', () => {
  let component: SchedulesDetailsComponent;
  let fixture: ComponentFixture<SchedulesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
