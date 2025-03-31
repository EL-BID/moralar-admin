import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementMapListSearchComponent } from './displacement-map-list-search.component';

describe('DisplacementMapListSearchComponent', () => {
  let component: DisplacementMapListSearchComponent;
  let fixture: ComponentFixture<DisplacementMapListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementMapListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementMapListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
