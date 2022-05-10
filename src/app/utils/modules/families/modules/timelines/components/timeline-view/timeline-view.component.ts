import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { etapasProcessoReassentamento } from 'src/app/core/mocks/etapasProcessoReassentamento';

import { ListContainerClass } from '../../../../../../classes/list-container.class';
import { HttpService } from '../../../../../../services/http/http.service';
import { MegaleiosAlertService } from '../../../../../megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from '../../../../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from '../../../../../shared/components/modal-confirm/modal-confirm.interface';

type TypeSubject = 2 | 4 | 7 | 8;

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass'],
})
export class TimelineViewComponent
  extends ListContainerClass
  implements OnInit
{
  listQuizByFamily = [];
  listPropertiesInterest = [];
  listCourseByFamily = [];
  listPollsByFamily = [];
  listSchedulesByFamily = [];
  listSchedulesHistory = [];
  familyId!: string;
  finishLoading = false;
  family = {
    id: '',
    holder: {
      name: '',
      number: '',
      cpf: '',
    },
  };

  // novos atributos
  etapasProcessoReassentamento = etapasProcessoReassentamento;
  processoReassentamentoAtivo = false;
  etapaSelecionada!: any;
  typeSubject!: TypeSubject;
  historicoFamilia = [];
  agendamentoSelecionado!: any;
  ocultarCheckbox = {
    selectItem: false,
    details: false,
    lockUnlock: true,
  };

  itIsResettlementStage = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private ngbModal: NgbModal,
    private megaleiosAlertService: MegaleiosAlertService,
    private router: Router
  ) {
    // @ts-ignore
    super();
    this.familyId = activatedRoute.snapshot.paramMap.get('familyId');
    this.typeSubject = Number(
      this.activatedRoute.snapshot.paramMap.get('typeSubject')
    ) as TypeSubject;
  }

  ngOnInit() {
    const resettlementSteps: TypeSubject[] = [2, 4, 7, 8];
    this.itIsResettlementStage = resettlementSteps.includes(this.typeSubject);
    if (this.itIsResettlementStage) {
      const stages = {
        2: [this.etapasProcessoReassentamento[0]],
        4: [
          this.etapasProcessoReassentamento[0],
          this.etapasProcessoReassentamento[1],
        ],
        7: [
          this.etapasProcessoReassentamento[0],
          this.etapasProcessoReassentamento[1],
          this.etapasProcessoReassentamento[2],
        ],
        8: [
          this.etapasProcessoReassentamento[0],
          this.etapasProcessoReassentamento[1],
          this.etapasProcessoReassentamento[2],
          this.etapasProcessoReassentamento[3],
        ],
      };
      this.etapasProcessoReassentamento = stages[this.typeSubject];
      this.selecionarEtapa(this.typeSubject);
      // this.getDetailTimeLineByTypeSubject(this.typeSubject);
    }
  }

  selecionarEtapa(typeSubject: number): void {
    this.etapaSelecionada = this.etapasProcessoReassentamento.find(
      (e: any) => e.typeSubject == typeSubject
    );
    this.etapaSelecionada.visivel = true;
    this.getDetailTimeLineByTypeSubject(typeSubject);
  }

  selecionarAgendamento(agendamentos: any[]): void {
    this.handleListItemSelected(agendamentos);
    if (this.listSelected.length > 1 || !this.listSelected.length)
      this.agendamentoSelecionado = null;
    if (this.listSelected.length == 1)
      this.agendamentoSelecionado = agendamentos;
  }

  getDetailTimeLineByTypeSubject(typeSubject): void {
    this.httpService
      .get(`Schedule/DetailTimeLine/${this.familyId}/${typeSubject}`)
      .subscribe(
        ({ data }: any) => {
          this.listSchedulesByFamily = data?.schedules;
          this.listQuizByFamily = data.detailQuiz;
          this.listPropertiesInterest = data.interestResidencialProperty;
          this.listCourseByFamily = data.courses;
          this.listPollsByFamily = data.detailEnquete;
          this.family.id = data?.familyId;
          this.family.holder.name = data?.holderName;
          this.family.holder.number = data?.holderNumber;
          this.family.holder.cpf = data?.holderCpf;
        },
        ({ message }: any) => {
          this.megaleiosAlertService.error(message);
        }
      );
  }

  confirmChange(): void {
    const body = {
      familyId: this.familyId,
      id: this.agendamentoSelecionado?.scheduleId,
      // id: '123',
      typeSubject: 8,
      place: 'Mudança',
      description: 'Mudança',
      date: Number(+new Date() / 1000).toFixed(0),
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
          this.httpService.post('Schedule/ChangeSubject', body).subscribe(
            ({ message }) => {
              this.megaleiosAlertService.success(message);
              this.etapasProcessoReassentamento[3].disponivel = true;
              this.typeSubject = 8;
            },
            ({ message }) => {
              this.megaleiosAlertService.error(message);
            }
          );
        }
      })
      .catch(() => {});
  }

  handleDetails(): void {
    this.router.navigate([
      `/${this.activatedRoute.parent.root.children[0].snapshot.url[0].path}/app/familias/`,
      this.familyId,
    ]);
  }

  handleFinalizeSchedule(schedule): void {
    if (this.finishLoading === false) {
      this.finishLoading = true;
      const index = schedule.index;
      delete schedule.index;
      const payload = { ...schedule, typeScheduleStatus: 4 };
      this.httpService
        .post('Schedule/ChangeStatus', payload)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            this.megaleiosAlertService.success(response.message);
            this.listSchedulesByFamily[index].typeScheduleStatus = 4;
            this.finishLoading = false;
          },
          (response: any) => {
            this.megaleiosAlertService.error(response.message);
            this.finishLoading = false;
          }
        );
    }
  }
}
