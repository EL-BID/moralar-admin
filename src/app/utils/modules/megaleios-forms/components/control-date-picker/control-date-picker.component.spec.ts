import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDatePickerComponent } from './control-date-picker.component';

describe('ControlDatePickerComponent', () => {
  let component: ControlDatePickerComponent;
  let fixture: ComponentFixture<ControlDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
