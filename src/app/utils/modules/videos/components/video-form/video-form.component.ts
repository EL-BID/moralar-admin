import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormComponentClass } from 'src/app/utils/classes/form-component.class';
import { trimWhiteSpace } from 'src/app/utils/functions/validators.function';

import { HttpService } from '../../../../services/http/http.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.sass'],
})
export class VideoFormComponent extends FormComponentClass implements OnInit {
  numberOfVacanciesList: any[] = new Array(21);

  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.form = this.formBuilder.group({
      Title: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      Thumbnail: [null, Validators.required],
      url: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      id: [],
    });
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('videoId')) {
      this.httpService
        .get(
          `Video/Detail/${this.activatedRoute.snapshot.paramMap.get('videoId')}`
        )
        .pipe(takeUntil(this.onDestroy))
        .subscribe((response: any) => {
          this.form.controls.Title.setValue(response.data.title);
          this.form.controls.Thumbnail.setValue(response.data.name);
          this.form.controls.url.setValue(response.data.url);
          this.form.controls.id.setValue(response.data.id);
        });
    }
  }
}
