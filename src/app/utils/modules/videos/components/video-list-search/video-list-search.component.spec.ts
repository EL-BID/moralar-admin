import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListSearchComponent } from './video-list-search.component';

describe('VideoListSearchComponent', () => {
  let component: VideoListSearchComponent;
  let fixture: ComponentFixture<VideoListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
