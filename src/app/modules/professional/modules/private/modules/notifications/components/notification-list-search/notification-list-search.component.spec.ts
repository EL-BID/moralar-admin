import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListSearchComponent } from './notification-list-search.component';

describe('NotificationListSearchComponent', () => {
  let component: NotificationListSearchComponent;
  let fixture: ComponentFixture<NotificationListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
