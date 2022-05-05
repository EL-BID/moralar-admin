import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { etapasProcessoReassentamentoAtivo } from 'src/app/core/mocks/etapasProcessoReassentamentoAtivo';

import { ListContainerClass } from '../../../../../../classes/list-container.class';
import { HttpService } from '../../../../../../services/http/http.service';
import { MegaleiosAlertService } from '../../../../../megaleios-alert/megaleios-alert.service';
import { ModalConfirmComponent } from '../../../../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmData } from '../../../../../shared/components/modal-confirm/modal-confirm.interface';

type TypeSubject = 2 | 4 | 7 | 8;
interface FamilyDTO {
  id?: string;
  holder?: {
    number?: string;
    cpf?: string;
    name?: string;
  };
}

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
  family = {
    id: '',
    holder: {
      name: '',
      number: '',
      cpf: '',
    },
  };

  // novos atributos
  etapasProcessoReassentamentoAtivo = etapasProcessoReassentamentoAtivo;
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
    // const tipoSituacoes = [2, 4, 7, 8];
    // this.processoReassentamentoAtivo = tipoSituacoes.includes(this.typeSubject);
    // this.buscarInformacoesSegmentadas();
    // this.buscarHistorico();

    // Novo
    const stages = {
      2: [this.etapasProcessoReassentamentoAtivo[0]],
      4: [
        this.etapasProcessoReassentamentoAtivo[0],
        this.etapasProcessoReassentamentoAtivo[1],
      ],
      7: [
        this.etapasProcessoReassentamentoAtivo[0],
        this.etapasProcessoReassentamentoAtivo[1],
        this.etapasProcessoReassentamentoAtivo[2],
      ],
      8: [
        this.etapasProcessoReassentamentoAtivo[0],
        this.etapasProcessoReassentamentoAtivo[1],
        this.etapasProcessoReassentamentoAtivo[2],
        this.etapasProcessoReassentamentoAtivo[3],
      ],
    };
    this.etapasProcessoReassentamentoAtivo = stages[this.typeSubject];
    this.selecionarEtapa(this.typeSubject);
    this.getDetailTimeLineByTypeSubject(this.typeSubject);
  }

  selecionarEtapa(typeSubject: number): void {
    this.etapaSelecionada = this.etapasProcessoReassentamentoAtivo.find(
      (e: any) => e.typeSubject == typeSubject
    );
    this.etapaSelecionada.visivel = true;
  }

  selecionarAgendamento(agendamentos: any[]): void {
    this.handleListItemSelected(agendamentos);
    if (this.listSelected.length > 1 || !this.listSelected.length)
      this.agendamentoSelecionado = null;
    if (this.listSelected.length == 1)
      this.agendamentoSelecionado = agendamentos;
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
      .get(`Schedule/GetHistoryByFamily/${this.familyId}`)
      .subscribe((response: any) => {
        this.historicoFamilia = response.data;
        this.listSchedulesHistory = response.data;
        this.validarEtapas();
        this.selecionarEtapa(
          this.etapasProcessoReassentamentoAtivo.findIndex(
            (e) => e.typeSubject == this.typeSubject
          )
        );
      });
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

  buscarInformacoesSegmentadas(typeSubject = this.typeSubject) {
    let link;
    switch (typeSubject) {
      case 2:
        link = `Schedule/DetailTimeLineProcessReunionPGM/${this.familyId}`;
        break;
      case 4:
        link = `Schedule/DetailTimeLineProcessChooseProperty/${this.familyId}`;
        break;
      case 7:
      case 8:
        link = `Schedule/DetailTimeLineProcessChoosePropertyOneAndTwo/${this.familyId}/${this.typeSubject}`;
        break;
    }

    if (link)
      this.httpService.get(link, true).subscribe(
        ({ data }) => {
          this.listSchedulesByFamily = data?.schedules;
          if (this.typeSubject == 2) this.listSchedulesByFamily = [data];
          this.listQuizByFamily = data.detailQuiz;
          this.listPropertiesInterest = data.interestResidencialProperty;
          this.listCourseByFamily = data.courses;
          this.listPollsByFamily = data.detailEnquete;
        },
        ({ message }) => {
          this.megaleiosAlertService.error(message);
          this.listSchedulesByFamily =
            this.listQuizByFamily =
            this.listPropertiesInterest =
            this.listCourseByFamily =
            this.listPollsByFamily =
              [];
        }
      );
  }

  confirmChange(): void {
    let post;

    post = {
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
          this.httpService.post('Schedule/ChangeSubject', post).subscribe(
            ({ message }) => {
              this.megaleiosAlertService.success(message);
              this.etapasProcessoReassentamentoAtivo[3].disponivel = true;
              this.typeSubject = 8;
              this.buscarInformacoesSegmentadas();
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
}
