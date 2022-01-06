import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListSearchComponent } from './schedule-list-search.component';

describe('ScheduleListSearchComponent', () => {
  let component: ScheduleListSearchComponent;
  let fixture: ComponentFixture<ScheduleListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
