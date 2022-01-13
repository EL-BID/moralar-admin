import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { etapasProcessoReassentamentoAtivo } from 'src/app/core/mocks/etapasProcessoReassentamentoAtivo';

import { ListContainerClass } from '../../../../../../classes/list-container.class';
import { dateAndTimeToString } from '../../../../../../functions/date.function';
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
  listQuizByFamily = [];
  listPropertiesInterest = [];
  listCourseByFamily = [];
  listPollsByFamily = [];
  listSchedulesByFamily = [];
  listSchedulesHistory = [];
  @Input()
  family: any;
  idFamilia!: string;

  // novos atributos
  etapasProcessoReassentamentoAtivo = etapasProcessoReassentamentoAtivo;
  processoReassentamentoAtivo = false;
  etapaSelecionada!: any;
  typeSubject!: any;
  historicoFamilia = [];
  agendamentoSelecionado!: any;

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

  ngOnInit() {
    this.idFamilia = this.activatedRoute.snapshot.paramMap.get('familyId');
    this.typeSubject = Number(
      this.activatedRoute.snapshot.paramMap.get('typeSubject') || 0
    );
    const tipoSituacoes = [2, 4, 7, 8];
    this.processoReassentamentoAtivo = tipoSituacoes.includes(this.typeSubject);
    this.buscarInformacoesSegmentadas();
    this.buscarHistorico();
  }

  selecionarEtapa(index: number): void {
    this.etapaSelecionada = this.etapasProcessoReassentamentoAtivo[index];
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
      .get(
        `Schedule/GetHistoryByFamily/${this.activatedRoute.snapshot.paramMap.get(
          'familyId'
        )}`
      )
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

  buscarInformacoesSegmentadas(typeSubject = this.typeSubject) {
    let link;
    switch (typeSubject) {
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
      this.httpService.get(link, true).subscribe(
        ({ data }) => {
          this.listSchedulesByFamily = data?.schedules;
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
      familyId: this.idFamilia,
      id: this.agendamentoSelecionado.id,
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
      this.family.id,
    ]);
  }
}
