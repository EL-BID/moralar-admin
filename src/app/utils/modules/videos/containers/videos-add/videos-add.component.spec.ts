import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosAddComponent } from './videos-add.component';

describe('VideosAddComponent', () => {
  let component: VideosAddComponent;
  let fixture: ComponentFixture<VideosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
