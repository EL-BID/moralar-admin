import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyListSearchComponent } from './family-list-search.component';

describe('FamilyListSearchComponent', () => {
  let component: FamilyListSearchComponent;
  let fixture: ComponentFixture<FamilyListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
