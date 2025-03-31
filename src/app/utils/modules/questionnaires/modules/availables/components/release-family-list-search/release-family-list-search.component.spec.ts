import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseFamilyListSearchComponent } from './release-family-list-search.component';

describe('ReleaseFamilyListSearchComponent', () => {
  let component: ReleaseFamilyListSearchComponent;
  let fixture: ComponentFixture<ReleaseFamilyListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseFamilyListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseFamilyListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
