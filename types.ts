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
    SIMULADOR: boolean;
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
  group: string,
  ranking: Team[]
}

export interface Modality {
  label: string,
  modality: string,
  series: string, 
  value: string, 
}