export interface PlayoffGame {
    ID: string;
    DIA: string;
    Mandante: string;
    LABEL_Mandante: string;
    Visitante: string;
    LABEL_Visitante: string;
    GOLS_MANDANTE: number;
    GOLS_VISITANTE: number;
    FASE: string;
    IDX_FASE?: number;
    HORARIO: string;
    LOCAL: string;
    PLACAR: string;
}
export interface Game {
    ID: string;
    DIA: string;
    Mandante: string;
    Visitante: string;
    GOLS_MANDANTE: number;
    GOLS_VISITANTE: number;
    GRUPO: string;
    HORARIO: string;
    LOCAL: string;
    PLACAR: string;
    SIMULADOR: string | boolean;
    modalidade?: string;
}

export interface GameUpdated {
    ID: string;
    DIA?: string;
    Mandante?: string;
    Visitante?: string;
    GOLS_MANDANTE: number | string;
    GOLS_VISITANTE: number | string;
    GRUPO?: string;
    HORARIO?: string;
    LOCAL?: string;
    PLACAR?: string;
    SIMULADOR?: boolean;
}
  
export interface Team {
  ID: string,
  Time: string,
  V: number
  E: number,
  D: number,
  Gols_Contra: number,
  Gols_Pro: number,
  Jogos: number,
  Pontos: number,
  Saldo: number,
}

export interface GroupRanking {
  group: string;
  ranking: Team[];
}

export interface Modality {
  label: string,
  modality: string,
  series: string, 
  value: string, 
}

export interface Info {
  boletimDate: string,
  dbUpdatedDate: string,
}

export interface MatchResult {
  [opponent: string]: string; // Chave: Nome do adversário, Valor: Resultado do jogo
}

export interface Confrontations {
  [team: string]: MatchResult; // Chave: Nome do time, Valor: Resultados dos jogos
}