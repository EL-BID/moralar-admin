import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../../../../../../../../utils/services/http/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MegaleiosAlertService } from '../../../../../../../../../../utils/modules/megaleios-alert/megaleios-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../../../../../../../../utils/modules/shared/components/modal/modal.component';
import { ModalConfirmData } from '../../../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.interface';
import { ModalConfirmComponent } from '../../../../../../../../../../utils/modules/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.sass'],
})
export class MatchViewComponent implements OnInit {
  @ViewChild('detailsFamily')
  detailsFamilyTemplateRef: TemplateRef<any>;
  detailsFamilyNgbModalRef: NgbModalRef;
  genderList: any[]; // = GENDER_LIST;
  openForSale: boolean = true;

  family: any;
  lista: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService
  ) {}

  ngOnInit(): void {
    this.httpService
      .get(
        `PropertiesInterest/DetailFamiliesMatch/${this.activatedRoute.snapshot.paramMap.get(
          'residencialPropertyId'
        )}`
      )
      .subscribe(
        (response: any) => {
          this.lista = response.data;
          this.openForSale = this.lista.find(
            (el) => el.typeStatusResidencial === 1
          )
            ? false
            : true;
        },
        ({ message }: any) => this.megaleiosAlertService.error(message)
      );
  }

  handleDatailsFamily(value): void {
    this.family = value;
    this.detailsFamilyNgbModalRef = this.ngbModal.open(ModalComponent, {
      size: 'xl',
      centered: true,
    });
    this.detailsFamilyNgbModalRef.componentInstance.templateRef =
      this.detailsFamilyTemplateRef;
  }

  sellProperty(familyId: any, hoderName: string): void {
    let post;
    post = {
      residencialPropertyId: this.activatedRoute.snapshot.paramMap.get(
        'residencialPropertyId'
      ),
      familiIdResidencialChosen: familyId,
    };
    let modalConfirmData: ModalConfirmData;

    modalConfirmData = {
      title: 'Contemplar imóvel',
      content: `Deseja realmente contemplar o imóvel para ${hoderName}?`,
      action: 'vender',
    };

    const modalRef = this.ngbModal.open(ModalConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this.httpService
            .post('ResidencialProperty/ChoiceProperty', post)
            .subscribe(
              (response: any) => {
                this.megaleiosAlertService.success(response.message);
                // this.router.navigate(['../'], { relativeTo: this.activatedRoute });
              },
              (response: any) => {
                this.megaleiosAlertService.error(response.message);
              }
            );
          this.ngOnInit();
        }
      })
      .catch(() => {});
  }
}
