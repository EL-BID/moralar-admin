import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementMapsComponent } from './displacement-maps.component';

describe('DisplacementMapsComponent', () => {
  let component: DisplacementMapsComponent;
  let fixture: ComponentFixture<DisplacementMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
