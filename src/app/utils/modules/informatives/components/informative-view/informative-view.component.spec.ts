import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeViewComponent } from './informative-view.component';

describe('InformativeViewComponent', () => {
  let component: InformativeViewComponent;
  let fixture: ComponentFixture<InformativeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
