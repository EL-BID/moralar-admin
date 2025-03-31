import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementMapDetailsComponent } from './displacement-map-details.component';

describe('DisplacementMapDetailsComponent', () => {
  let component: DisplacementMapDetailsComponent;
  let fixture: ComponentFixture<DisplacementMapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementMapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
