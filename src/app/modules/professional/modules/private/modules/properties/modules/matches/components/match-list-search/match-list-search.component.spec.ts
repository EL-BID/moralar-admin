import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListSearchComponent } from './match-list-search.component';

describe('MatchListSearchComponent', () => {
  let component: MatchListSearchComponent;
  let fixture: ComponentFixture<MatchListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
