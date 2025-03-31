import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideoFormComponent } from './components/video-form/video-form.component';
import { VideoListSearchComponent } from './components/video-list-search/video-list-search.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { VideosAddComponent } from './containers/videos-add/videos-add.component';
import { VideosDetailsComponent } from './containers/videos-details/videos-details.component';
import { VideosListComponent } from './containers/videos-list/videos-list.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

// containers
// components

@NgModule({
  declarations: [
    VideosComponent,
    // containers
    VideosListComponent,
    VideosAddComponent,
    VideosDetailsComponent,
    // components
    VideoListComponent,
    VideoListSearchComponent,
    VideoFormComponent,
    VideoViewComponent,
  ],
  imports: [VideosRoutingModule, SharedModule],
})
export class VideosModule {}
