import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsAddComponent } from './professionals-add.component';

describe('ProfessionalsAddComponent', () => {
  let component: ProfessionalsAddComponent;
  let fixture: ComponentFixture<ProfessionalsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
