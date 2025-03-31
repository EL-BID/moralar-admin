import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablesDetailsComponent } from './availables-details.component';

describe('AvailablesDetailsComponent', () => {
  let component: AvailablesDetailsComponent;
  let fixture: ComponentFixture<AvailablesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
