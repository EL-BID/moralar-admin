import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagersListComponent } from './public-managers-list.component';

describe('PublicManagersListComponent', () => {
  let component: PublicManagersListComponent;
  let fixture: ComponentFixture<PublicManagersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
