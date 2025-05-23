import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFormComponent } from './administrator-form.component';

describe('AdministratorFormComponent', () => {
  let component: AdministratorFormComponent;
  let fixture: ComponentFixture<AdministratorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
