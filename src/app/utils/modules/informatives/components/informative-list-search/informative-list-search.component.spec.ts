import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeListSearchComponent } from './informative-list-search.component';

describe('InformativeListSearchComponent', () => {
  let component: InformativeListSearchComponent;
  let fixture: ComponentFixture<InformativeListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
