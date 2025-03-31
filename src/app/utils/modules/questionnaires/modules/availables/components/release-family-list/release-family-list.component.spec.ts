import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseFamilyListComponent } from './release-family-list.component';

describe('ReleaseFamilyListComponent', () => {
  let component: ReleaseFamilyListComponent;
  let fixture: ComponentFixture<ReleaseFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseFamilyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
