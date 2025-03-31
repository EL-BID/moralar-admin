import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesAddComponent } from './families-add.component';

describe('FamiliesAddComponent', () => {
  let component: FamiliesAddComponent;
  let fixture: ComponentFixture<FamiliesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
