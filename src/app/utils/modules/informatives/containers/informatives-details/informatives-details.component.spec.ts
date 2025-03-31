import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativesDetailsComponent } from './informatives-details.component';

describe('InformativesDetailsComponent', () => {
  let component: InformativesDetailsComponent;
  let fixture: ComponentFixture<InformativesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
