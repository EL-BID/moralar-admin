import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineListSearchComponent } from './timeline-list-search.component';

describe('TimelineListSearchComponent', () => {
  let component: TimelineListSearchComponent;
  let fixture: ComponentFixture<TimelineListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
