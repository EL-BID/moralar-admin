import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalListSearchComponent } from './professional-list-search.component';

describe('ProfessionalListSearchComponent', () => {
  let component: ProfessionalListSearchComponent;
  let fixture: ComponentFixture<ProfessionalListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
