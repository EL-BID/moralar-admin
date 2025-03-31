import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorListSearchComponent } from './administrator-list-search.component';

describe('AdministratorListSearchComponent', () => {
  let component: AdministratorListSearchComponent;
  let fixture: ComponentFixture<AdministratorListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
