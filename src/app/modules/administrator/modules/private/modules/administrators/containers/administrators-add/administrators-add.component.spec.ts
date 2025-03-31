import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsAddComponent } from './administrators-add.component';

describe('AdministratorsAddComponent', () => {
  let component: AdministratorsAddComponent;
  let fixture: ComponentFixture<AdministratorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
