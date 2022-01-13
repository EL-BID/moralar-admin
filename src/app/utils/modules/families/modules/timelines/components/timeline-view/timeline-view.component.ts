import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { etapasProcessoReassentamentoAtivo } from 'src/app/core/mocks/etapasProcessoReassentamentoAtivo';

import { ListContainerClass } from '../../../../../../classes/list-container.class';
import { dateAndTimeToString } from '../../../../../../functions/date.function';
import { SCHEDULE_TYPE_LIST } from '../../../../../../interfaces/schedules.interface';
import { TIMELINE_STATUS_LIST } from '../../../../../../interfaces/timelines.interface';
import { HttpService } from '../../../../../../services/http/http.service';
import { MegaleiosAlertService } from '../../../../../megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from '../../../../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from '../../../../../shared/components/modal-confirm/modal-confirm.interface';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass'],
})
export class TimelineViewComponent
  extends ListContainerClass
  implements OnInit
{
  timeLineStatusList: any[] = TIMELINE_STATUS_LIST;
  scheduleTypeList: any[] = SCHEDULE_TYPE_LIST;
  listQuizByFamily: any[];
  listPropertiesInterest: any[];
  listCourseByFamily: any[];
  listPollsByFamily: any[];
  listSchedulesByFamily: any[];
  typeSubjectCurrent: any;
  tabSelected: any;
  stage: any[];
  listSchedulesHistory: any[];
  @Input()
  family: any;
  idFamilia!: string;

  // novos atributos
  etapasProcessoReassentamentoAtivo = etapasProcessoReassentamentoAtivo;
  processoReassentamentoAtivo = true;
  etapaSelecionada!: any;
  typeSubject!: any;
  historicoFamilia = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router
  ) {
    // @ts-ignore
    super();
  }

  // novos códigos

  selecionarEtapa(index: number): void {
    this.etapaSelecionada = this.etapasProcessoReassentamentoAtivo[index];
    this.etapaSelecionada.visivel = true;
  }
  // Fim dos novos códigos

  ngOnInit() {
    this.idFamilia = this.activatedRoute.snapshot.paramMap.get('familyId');
    this.typeSubject = Number(
      this.activatedRoute.snapshot.paramMap.get('typeSubject') || 0
    );
    this.getObjs();
    this.buscarHistorico();
  }

  validarEtapas(): void {
    this.etapasProcessoReassentamentoAtivo[0].disponivel =
      this.historicoFamilia.some((e) => e.typeSubject == 2);

    this.etapasProcessoReassentamentoAtivo[1].disponivel =
      this.historicoFamilia.some((e) => e.typeSubject == 4);

    this.etapasProcessoReassentamentoAtivo[2].disponivel =
      this.historicoFamilia.some((e) => e.typeSubject == 7);

    this.etapasProcessoReassentamentoAtivo[3].disponivel =
      this.historicoFamilia.some((e) => e.typeSubject == 8);
  }

  buscarHistorico(): void {
    this.httpService
      .get(
        `Schedule/GetHistoryByFamily/${this.activatedRoute.snapshot.paramMap.get(
          'familyId'
        )}`
      )
      .subscribe((response: any) => {
        this.historicoFamilia = response.data;
        this.listSchedulesHistory = response.data;
        this.validarEtapas();
        for (let i = 0; response.data.length > i; i++) {
          this.listSchedulesHistory[i].date = dateAndTimeToString(
            this.listSchedulesHistory[i].date
          );
        }
      });
  }

  getObjs() {
    let link;
    switch (this.typeSubject) {
      case 2:
        link = `Schedule/DetailTimeLineProcessReunionPGM/${this.idFamilia}`;
        break;
      case 4:
        link = `Schedule/DetailTimeLineProcessChooseProperty/${this.idFamilia}`;
        break;
      case 7:
      case 8:
        link = `Schedule/DetailTimeLineProcessChoosePropertyOneAndTwo/${this.idFamilia}/${this.typeSubject}`;
        break;
    }

    if (link)
      this.httpService.get(link).subscribe((response: any) => {
        this.listQuizByFamily = response.data.detailQuiz;
        this.listPropertiesInterest = response.data.interestResidencialProperty;
        this.listCourseByFamily = response.data.courses;
        for (let i = 0; response.data.courses.length > i; i++) {
          this.listCourseByFamily[i].startDate = dateAndTimeToString(
            this.listCourseByFamily[i].startDate
          );
          this.listCourseByFamily[i].endDate = dateAndTimeToString(
            this.listCourseByFamily[i].endDate
          );
        }
      });
  }

  confirmChange(value: any): void {
    let post;
    post = {
      familyId: this.activatedRoute.snapshot.paramMap.get('familyId'),
      id: value?.scheduleId,
      typeSubject: 8,
      place: 'Mudança',
      description: 'Mudança',
      date: value?.date,
    };
    let modalConfirmData: ModalConfirmData;

    modalConfirmData = {
      title: 'Confirmar mudança',
      content: 'Deseja realmente confirmar mudança?',
      action: 'confirmar',
    };

    const modalRef = this.ngbModal.open(ModalConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalConfirmData = modalConfirmData;
    modalRef.result
      .then((result: any) => {
        if (result) {
          this.httpService.post('Schedule/ChangeSubject', post).subscribe(
            (response: any) => {
              this.megaleiosAlertService.success(response.message);
              setTimeout(() => {
                location.reload();
              }, 1000);
            },
            (response: any) => {
              this.megaleiosAlertService.error(response.message);
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          );
        }
      })
      .catch(() => {});
  }

  handleDetails(): void {
    this.router.navigate([
      `/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/familias/`,
      this.family.id,
    ]);
  }
}
