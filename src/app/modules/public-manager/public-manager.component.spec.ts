import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagerComponent } from './public-manager.component';

describe('PublicManagerComponent', () => {
  let component: PublicManagerComponent;
  let fixture: ComponentFixture<PublicManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
