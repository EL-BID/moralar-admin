import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeListComponent } from './informative-list.component';

describe('InformativeListComponent', () => {
  let component: InformativeListComponent;
  let fixture: ComponentFixture<InformativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
