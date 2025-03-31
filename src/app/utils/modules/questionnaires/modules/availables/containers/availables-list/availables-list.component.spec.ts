import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablesListComponent } from './availables-list.component';

describe('AvailablesListComponent', () => {
  let component: AvailablesListComponent;
  let fixture: ComponentFixture<AvailablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
