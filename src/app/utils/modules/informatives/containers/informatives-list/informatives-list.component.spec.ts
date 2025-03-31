import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativesListComponent } from './informatives-list.component';

describe('InformativesListComponent', () => {
  let component: InformativesListComponent;
  let fixture: ComponentFixture<InformativesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
