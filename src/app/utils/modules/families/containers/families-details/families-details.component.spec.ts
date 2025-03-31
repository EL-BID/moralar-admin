import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesDetailsComponent } from './families-details.component';

describe('FamiliesDetailsComponent', () => {
  let component: FamiliesDetailsComponent;
  let fixture: ComponentFixture<FamiliesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
