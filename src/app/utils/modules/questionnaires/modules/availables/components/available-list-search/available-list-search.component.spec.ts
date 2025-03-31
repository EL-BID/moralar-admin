import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableListSearchComponent } from './available-list-search.component';

describe('AvailableListSearchComponent', () => {
  let component: AvailableListSearchComponent;
  let fixture: ComponentFixture<AvailableListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
