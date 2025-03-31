import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagerListComponent } from './public-manager-list.component';

describe('PublicManagerListComponent', () => {
  let component: PublicManagerListComponent;
  let fixture: ComponentFixture<PublicManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
