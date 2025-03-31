import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output()
    getThumbnail: EventEmitter<File> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      thumbnail: [null, Validators.required],
      url: [null, Validators.compose([trimWhiteSpace, Validators.required])],
      id: [],
    });
  }

  public getFileThumbnail( file: File ) {
    this.getThumbnail.emit( file );
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('videoId')) {
      this.httpService
        .get(
          `Video/Detail/${this.activatedRoute.snapshot.paramMap.get('videoId')}`
        )
        .pipe(takeUntil(this.onDestroy))
        .subscribe(({ data }: any) => {
          this.form.patchValue(data);
        });
    }
  }
}
