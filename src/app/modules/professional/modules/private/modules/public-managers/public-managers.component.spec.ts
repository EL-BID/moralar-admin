import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagersComponent } from './public-managers.component';

describe('PublicManagersComponent', () => {
  let component: PublicManagersComponent;
  let fixture: ComponentFixture<PublicManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
