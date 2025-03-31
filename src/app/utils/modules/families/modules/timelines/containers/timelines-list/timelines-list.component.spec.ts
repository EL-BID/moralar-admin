import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesListComponent } from './timelines-list.component';

describe('TimelinesListComponent', () => {
  let component: TimelinesListComponent;
  let fixture: ComponentFixture<TimelinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
