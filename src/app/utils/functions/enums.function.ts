export class Enums {
  public static getTypeScheduleStatusByName( status: String ): number {
    switch ( status ) {
      case "Aguardando confirmação":
        return TypeScheduleStatus.AguardandoConfirmacao;
      case "Confirmado":
        return TypeScheduleStatus.Confirmado;
      case "Aguardando reagendamento":
        return TypeScheduleStatus.AguardandoReagendamento;
      case "Reagendado":
        return TypeScheduleStatus.Reagendado;
      case "Finalizado":
        return TypeScheduleStatus.Finalizado;
      case "Cancelado":
        return TypeScheduleStatus.Cancelado;
    }
  }

  public static getTypeScheduleNameByStatus( status: number ): string {
    switch ( status ) {
      case TypeScheduleStatus.AguardandoConfirmacao:
        return "Aguardando confirmação";
      case TypeScheduleStatus.Confirmado:
        return "Confirmado";
      case TypeScheduleStatus.AguardandoReagendamento:
        return "Aguardando reagendamento";
      case TypeScheduleStatus.Reagendado:
        return "Reagendado";
      case TypeScheduleStatus.Finalizado:
        return "Finalizado";
      case TypeScheduleStatus.Cancelado:
        return "Cancelado";
    }
  }

  public static getTypeSubjectByName(value: String): number {
    switch (value) {
      case "Visita do TTS":
        return TypeSubject.VisitaTTS;
      case "Reunião com TTS":
        return TypeSubject.ReuniaoTTS;
      case "Reunião PGM":
        return TypeSubject.ReuniaoPGM;
      case "Visita ao imóvel":
        return TypeSubject.VisitaImovel;
      case "Escolha do imóvel":
        return TypeSubject.EscolhaDoImovel;
      case "Demolição":
        return TypeSubject.Demolicao;
      case "Outros":
        return TypeSubject.Outros;
      case "Mudança":
        return TypeSubject.Mudanca;
      case "Acompanhamento pós-mudança":
        return TypeSubject.AcompanhamentoPosMudanca;
    }
  }

  public static getTypeStatusResidencial( value: String ): number {
    switch ( value ) {
      case "A Escolher":
        return TypeStatusResidencial.AEscolher;
      case "Vendido":
        return TypeStatusResidencial.Vendido;
      default:
        return TypeStatusResidencial.AEscolher;
    }
  }

  public static getForTypeRole( value: String ): number {
    switch ( value ) {
      case "Family":
        return ForTypeRole.Family;
      case "TTS":
        return ForTypeRole.TTS;
      case "Gestor":
        return ForTypeRole.Gestor;
      case "Administrador":
        return ForTypeRole.Administrador;
      default:
        return ForTypeRole.Administrador;
    }
  }

  public static getForTypeGenre( value: String ): number {
    switch ( value ) {
      case "Feminino":
        return TypeGenre.Feminino;
      case "Masculino":
        return TypeGenre.Masculino;
      case "Outro":
        return TypeGenre.Outro;
      case "Todos":
        return TypeGenre.Todos;
      default:
        return TypeGenre.Outro;
    }
  }

  public static getForTypeScholarity( value: String ): number {
    switch ( value ) {
      case "Não possui":
        return TypeScholarity.NaoPossui;
      case "Fundamental (incompleto)":
        return TypeScholarity.FundamentalIncompleto;
      case "Fundamental (completo)":
        return TypeScholarity.FundamentalCompleto;
      case "Médio (incompleto)":
        return TypeScholarity.MedioIncompleto;
      case "Médio (completo)":
        return TypeScholarity.MedioCompleto;
      case "Superior (incompleto)":
        return TypeScholarity.SuperiorIncompleto;
      case "Superior (completo)":
        return TypeScholarity.SuperiorCompleto;
      case "Pós-graduação (incompleto)":
        return TypeScholarity.PosGraduacaoIncompleto;
      case "Pós-graduação (completo":
        return TypeScholarity.PosGraduacaoCompleto;
      default:
        return TypeScholarity.NaoPossui;
    }
  }

  public static getTypeProperty( value: String ): number {
    switch ( value ) {
      case "Casa":
        return TypeProperty.Casa;
      case "Apartamento":
        return TypeProperty.Aparamento;
      default:
        return TypeProperty.Casa;
    }
  }

  public static getTypePropertyRegularization( value: String ): number {
    switch ( value ) {
      case "Regular":
        return TypePropertyRegularization.Regular;
      case "Regularizável":
        return TypePropertyRegularization.Regularizável;
      case "Irregular":
        return TypePropertyRegularization.Irregular;
      default:
        return TypePropertyRegularization.Irregular;
    }
  }
  
  public static getTypePropertyGasInstallation( value: String ): number {
    switch ( value ) {
      case "Gás encanado":
        return TypePropertyGasInstallation.GásEncanado;
      case "Botijão":
        return TypePropertyGasInstallation.Botijão;
      default:
        return TypePropertyGasInstallation.Botijão;
    }
  }

  public static getTypeTypeKingShip( value: String ): number {
    switch ( value ) {
      case "Filha":
        return TypeKingShip.Filha;
      case "Filho":
        return TypeKingShip.Filho;
      case "Mãe":
        return TypeKingShip.Mae;
      case "Pai":
        return TypeKingShip.Pai;
      case "Avó":
        return TypeKingShip.AvoMulher;
      case "Avô":
        return TypeKingShip.AvoHomem;
      case "Enteada":
        return TypeKingShip.Enteada;
      case "Enteado":
        return TypeKingShip.Enteado;
      case "Tia":
        return TypeKingShip.Tia;
      case "Tio":
        return TypeKingShip.Tia;
      case "Outro":
        return TypeKingShip.Outro;
      default:
        return TypeKingShip.Outro;
    }
  }

  public static getTypeResponse( value: String ): number {
    switch ( value ) {
      case "Texto":
        return TypeResponse.Texto;
      case "Múltipla escolha":
        return TypeResponse.MultiplaEscolha;
      case "Escolha única":
        return TypeResponse.EscolhaUnica;
      case "Lista suspensa":
        return TypeResponse.ListaSuspensa;
      default:
        return TypeResponse.Texto;
    }
  }

  public static getTypestatus( value: String ): number {
    switch ( value ) {
      case "Não Respondido":
        return TypeStatus.NaoRespondido;
      case "Respondido":
        return TypeStatus.Respondido;
      default:
        return TypeStatus.NaoRespondido;
    }
  }

  public static getRolNumber(typeProfile: string) {
    switch ( typeProfile ) {
      case "Gestor":
        return 2
      case "TTS":
        return 1
      default:
        return 3;
    }
  }

  public static getTypeErrorExcel( value: string ) {
    switch ( value ) {
      case "Null":
        return TypeErrorExcel.Null;
      case "Numeric":
        return TypeErrorExcel.Numeric;
      case "InvalidFormat":
        return TypeErrorExcel.InvalidFormat;
      case "WrongDate":
        return TypeErrorExcel.WrongDate;
      default:
        return TypeErrorExcel.Null;
    }
  }
}

enum TypeStatus {
  NaoRespondido = 0,
  Respondido = 1,
}

enum TypeResponse {
  Texto = 0,
  MultiplaEscolha = 1,
  EscolhaUnica = 2,
  ListaSuspensa = 3
}

export enum TypeKingShip {
  Filha = 0,
  Filho = 1,
  Mae = 2,
  Pai = 3,
  AvoMulher = 4,
  AvoHomem = 5,
  Enteada = 6,
  Enteado = 7,
  Tia = 8,
  Tio = 9,
  Outro = 10
}

enum TypeGenre {
  Feminino = 0,
  Masculino = 1,
  Outro = 2,
  Todos = 3
}

enum TypeProperty {
  Casa = 0,
  Aparamento = 1
}

enum TypePropertyRegularization {
  Regular = 0,
  Regularizável = 1,
  Irregular = 2
}

enum TypePropertyGasInstallation {
  GásEncanado = 0,
  Botijão = 1
}

export enum TypeScholarity {
  NaoPossui = 0,
  FundamentalIncompleto = 1,
  FundamentalCompleto = 2,
  MedioIncompleto = 3,
  MedioCompleto = 4,
  SuperiorIncompleto = 5,
  SuperiorCompleto = 6,
  PosGraduacaoIncompleto = 7,
  PosGraduacaoCompleto = 8
}

enum ForTypeRole {
  Family = 0,
  TTS = 1,
  Gestor = 2,
  Administrador = 3
}

enum TypeScheduleStatus {
  AguardandoConfirmacao = 0,
  Confirmado = 1,
  AguardandoReagendamento = 2,
  Reagendado = 3,
  Finalizado = 4,
  Cancelado = 5,
}

enum TypeSubject {
  VisitaTTS = 0,
  ReuniaoTTS = 1,
  ReuniaoPGM = 2,
  VisitaImovel = 3,
  EscolhaDoImovel = 4,
  Demolicao = 5,
  Outros = 6,
  Mudanca = 7,
  AcompanhamentoPosMudanca = 8
}

enum TypeStatusResidencial {
  AEscolher = 0,
  Vendido = 1,
}

enum TypeErrorExcel {
  Null = 0,
  Numeric = 1,
  InvalidFormat = 2,
  WrongDate = 3,
}