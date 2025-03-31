import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementMapListComponent } from './displacement-map-list.component';

describe('DisplacementMapListComponent', () => {
  let component: DisplacementMapListComponent;
  let fixture: ComponentFixture<DisplacementMapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementMapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
