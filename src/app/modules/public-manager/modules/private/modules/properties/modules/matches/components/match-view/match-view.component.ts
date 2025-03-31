import {
  Component,
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
import { Enums } from 'src/app/utils/functions/enums.function';

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

  residencialCode: string = '';

  public spinnerContemplating = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.residencialCode = this.route.snapshot.queryParams[ 'residencialCode' ];

    this.getProperty();
  }

  getProperty(): void {
    this.httpService
      .get(
        `PropertiesInterest/DetailFamiliesMatch/${this.activatedRoute.snapshot.paramMap.get(
          'residencialPropertyId'
        )}`
      )
      .subscribe(
        (response: any) => {
          this.lista = response.data;
          this.openForSale = !this.lista.find(
            (el) => this.getTypeStatusResidencial(el.typeStatusResidencial) === 1
          )
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
  

  getTypeStatusResidencial(value: string): number {
    return Enums.getTypeStatusResidencial(value);
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
      title: `Vender imóvel`,
      content: `Deseja realmente vender} 
        o imóvel para ${hoderName}?`,
      action: 'vender',
      confirmColor: null,
      cancelColor: null
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
                this.getProperty();
              },
              (response: any) => {
                this.megaleiosAlertService.error(response.message);
              }
            );
        }
      })
      .catch(() => {});
  }

  contemplateProperty(itsContemplate: boolean,familyId: any, hoderName: string): void {
    let post;
    post = {
      residencialPropertyId: this.activatedRoute.snapshot.paramMap.get(
        'residencialPropertyId'
      ),
      familiIdResidencialContemplate: itsContemplate ? familyId : null,
    };
    let modalConfirmData: ModalConfirmData;

    modalConfirmData = {
      title: `${itsContemplate ? 'Contemplar para análise' : 'Descontemplar'} imóvel`,
      content: `Deseja realmente ${ itsContemplate ? 'contemplar' : 'descontemplar'} 
        o imóvel para ${hoderName}?`,
      action: itsContemplate ? 'contemplar para análise' : 'descontemplar',
      confirmColor: itsContemplate ? 'btn-info' : 'btn-danger',
      cancelColor: itsContemplate ? 'btn-danger' : 'btn-secondary'
    };

    const modalRef = this.ngbModal.open(ModalConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this.spinnerContemplating[ familyId ] = {
            open: true,
            message: ""
          }
          this.httpService
            .post('ResidencialProperty/ContemplateFamilyInTheResidence', post)
           .subscribe(
             (response: any) => {
               this.spinnerContemplating[ familyId ].open = false;
               this.megaleiosAlertService.success(response.message);
               this.getProperty();
             },
             (response: any) => {
               this.spinnerContemplating[ familyId ].open = false;
               this.megaleiosAlertService.error(response.message);
             }
           );
        }
      })
      .catch(() => {});
  }
}
