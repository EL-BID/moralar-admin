import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsDetailsComponent } from './administrators-details.component';

describe('AdministratorsDetailsComponent', () => {
  let component: AdministratorsDetailsComponent;
  let fixture: ComponentFixture<AdministratorsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
