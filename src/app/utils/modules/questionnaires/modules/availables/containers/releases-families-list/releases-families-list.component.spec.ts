import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesFamiliesListComponent } from './releases-families-list.component';

describe('ReleasesFamiliesListComponent', () => {
  let component: ReleasesFamiliesListComponent;
  let fixture: ComponentFixture<ReleasesFamiliesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasesFamiliesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesFamiliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
