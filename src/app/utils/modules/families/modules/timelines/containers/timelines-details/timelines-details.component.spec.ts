import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesDetailsComponent } from './timelines-details.component';

describe('CoursesDetailsComponent', () => {
  let component: TimelinesDetailsComponent;
  let fixture: ComponentFixture<TimelinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
