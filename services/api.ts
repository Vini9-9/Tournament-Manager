import { Confrontations, Flag, Game, GroupRanking, Info, Modality, PlayoffGame } from '../types';

const API_URL = 'https://vini99.pythonanywhere.com/api'; // ou o endereço da sua API local

const api = {
  getInfo: async (): Promise<Info> => {
    try {
      const response = await fetch(`${API_URL}/info`);
      const data = await response.json();
      return data as Info;
    } catch (error) {
      console.error('Erro ao obter info:', error);
      return {} as Info
    }
  },
  getFlag: async (): Promise<Flag> => {
    try {
      const response = await fetch(`${API_URL}/flags`);
      const data = await response.json();
      return data as Flag;
    } catch (error) {
      console.error('Erro ao obter flag:', error);
      return {} as Flag
    }
  },
  getModalities: async (): Promise<Modality[]> => {
    try {
      const response = await fetch(`${API_URL}/modalities`);
      const data = await response.json();
      return data as Modality[];
    } catch (error) {
      console.error('Erro ao obter modalidades:', error);
      return []
    }
  },
  getLocalities: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_URL}/localities`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter localidades:', error);
      return []
    }
  },
  getGames: async (modality: string, series: string): Promise<Game[]> => {
    try {
      const response = await fetch(`${API_URL}/games/${modality}/${series}`);
      const data = await response.json();
      return data as Game[];
    } catch (error) {
      console.error('Erro ao obter jogos:', error);
      return []
    }
  },
  getPlayoff: async (modality: string, series: string): Promise<PlayoffGame[]> => {
    try {
      const response = await fetch(`${API_URL}/playoff/${modality}/${series}`);
      const data = await response.json();
      return data as PlayoffGame[];
    } catch (error) {
      console.error('Erro ao obter playoff:', error);
      return []
    }
  },
  getNextGames: async (local: string): Promise<Game[]> => {
    try {
      const response = await fetch(`${API_URL}/nextGames/local/${local}`);
      const data = await response.json();
      return data as Game[];
    } catch (error) {
      console.error('Erro ao obter proximos jogos:', error);
      return []
    }
  },
  getRanking: async (modality: string, series: string): Promise<GroupRanking[]> => {
    try {
      const response = await fetch(`${API_URL}/ranking/${modality}/${series}`);
      const data = await response.json();
      return data as GroupRanking[];
    } catch (error) {
      console.error('Erro ao obter ranking:', error);
      return []
    }
  },
  getConfrontations:async (modality: string, series: string): Promise<Confrontations> => {
    try {
      const response = await fetch(`${API_URL}/games/${modality}/${series}/confrontation`);
      const data = await response.json();
      return data as Confrontations;
    } catch (error) {
      console.error('Erro ao obter confrontos:', error);
      return {}
    }
  },

};

export default api;


