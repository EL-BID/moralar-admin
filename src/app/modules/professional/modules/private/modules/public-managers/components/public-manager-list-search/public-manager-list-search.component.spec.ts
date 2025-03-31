import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicManagerListSearchComponent } from './public-manager-list-search.component';

describe('PublicManagerListSearchComponent', () => {
  let component: PublicManagerListSearchComponent;
  let fixture: ComponentFixture<PublicManagerListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicManagerListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicManagerListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
