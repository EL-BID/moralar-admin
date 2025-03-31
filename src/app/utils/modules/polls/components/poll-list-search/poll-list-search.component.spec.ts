import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollListSearchComponent } from './poll-list-search.component';

describe('PollListSearchComponent', () => {
  let component: PollListSearchComponent;
  let fixture: ComponentFixture<PollListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
