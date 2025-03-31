import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativesAddComponent } from './informatives-add.component';

describe('InformativesAddComponent', () => {
  let component: InformativesAddComponent;
  let fixture: ComponentFixture<InformativesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
