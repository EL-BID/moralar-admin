import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativesComponent } from './informatives.component';

describe('InformativesComponent', () => {
  let component: InformativesComponent;
  let fixture: ComponentFixture<InformativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
