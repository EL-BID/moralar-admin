import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagersAddComponent } from './public-managers-add.component';

describe('PublicManagersAddComponent', () => {
  let component: PublicManagersAddComponent;
  let fixture: ComponentFixture<PublicManagersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
