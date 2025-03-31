import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRadioComponent } from './control-radio.component';

describe('ControlRadioComponent', () => {
  let component: ControlRadioComponent;
  let fixture: ComponentFixture<ControlRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
