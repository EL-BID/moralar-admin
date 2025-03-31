import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsDetailsComponent } from './polls-details.component';

describe('PollsDetailsComponent', () => {
  let component: PollsDetailsComponent;
  let fixture: ComponentFixture<PollsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
