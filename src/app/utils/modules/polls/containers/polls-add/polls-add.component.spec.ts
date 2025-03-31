import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsAddComponent } from './polls-add.component';

describe('PollsAddComponent', () => {
  let component: PollsAddComponent;
  let fixture: ComponentFixture<PollsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
