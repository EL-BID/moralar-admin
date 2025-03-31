import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagerFormComponent } from './public-manager-form.component';

describe('PublicManagerFormComponent', () => {
  let component: PublicManagerFormComponent;
  let fixture: ComponentFixture<PublicManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
