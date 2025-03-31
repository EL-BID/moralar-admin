import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from 'src/app/utils/services/http/http.service';
import { Enums } from 'src/app/utils/functions/enums.function';
import { FileService } from 'src/app/utils/services/file/file.service';

@Component({
  selector: 'app-properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss'],
})
export class PropertiesEditComponent implements OnInit {
  property!: any;
  loading = false;

  private fileProject: File = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpService: HttpService,
    private location: Location,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    const propertyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService
      .get(`ResidencialProperty/Detail/${propertyId}`)
      .subscribe(({ data }) => {
        this.property = data;
        this.transformEnumsProperties();
      });
  }

  private transformEnumsProperties() {
    if ( this.property.typeStatusResidencialProperty ) {
      this.property.typeStatusResidencialProperty = Enums.getTypeStatusResidencial(
        this.property.typeStatusResidencialProperty );
    }
    if ( this.property.residencialPropertyFeatures.typeProperty ) {
      this.property.residencialPropertyFeatures.typeProperty = Enums.getTypeProperty(
        this.property.residencialPropertyFeatures.typeProperty );
    }
    if ( this.property.residencialPropertyFeatures.propertyRegularization ) {
      this.property.residencialPropertyFeatures.propertyRegularization = 
        Enums.getTypePropertyRegularization(
        this.property.residencialPropertyFeatures.propertyRegularization );
    }
    if ( this.property.residencialPropertyFeatures.typeGasInstallation ) {
      this.property.residencialPropertyFeatures.typeGasInstallation =
        Enums.getTypePropertyGasInstallation(
          this.property.residencialPropertyFeatures.typeGasInstallation );
    }
  }

  async editProperty(payload: any): Promise<void> {
    payload.photo = await this.fileService.uploadFiles(payload.photo);
    payload.project = await this.fileService.uploadProject(payload.project, this.fileProject);

    payload.photo = payload.photo.map(photoItem => ({
      ...photoItem,
      description: photoItem.description.value
    }))

    this.loading = true;
    this.httpService
      .patch('ResidencialProperty/' + payload.id, payload, true)
      .subscribe(
        (_) => this.location.back(),
        (_) => (this.loading = false)
      );
  }

  public getFileProject(file: File) {
    this.fileProject = file;
  }
}
