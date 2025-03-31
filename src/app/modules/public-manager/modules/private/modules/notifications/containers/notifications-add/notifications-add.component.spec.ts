import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsAddComponent } from './notifications-add.component';

describe('NotificationsAddComponent', () => {
  let component: NotificationsAddComponent;
  let fixture: ComponentFixture<NotificationsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
