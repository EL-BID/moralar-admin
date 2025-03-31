import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeFormComponent } from './informative-form.component';

describe('InformativeFormComponent', () => {
  let component: InformativeFormComponent;
  let fixture: ComponentFixture<InformativeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
