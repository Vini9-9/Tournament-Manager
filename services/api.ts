import { Confrontations, Game, GroupRanking, Info, Modality, Team } from '../types';

const API_URL = 'https://vini99.pythonanywhere.com/api'; // ou o endereço da sua API local
// const MOCK_API_URL = 'https://6398a58f29930e2bb3bd4ef3.mockapi.io/api/'; // ou o endereço da sua API local
// const MOCK_API_MODALITIES_URL = 'https://run.mocky.io/v3/ad07e52d-b970-4488-b484-5045fccbf236'; // ou o endereço da sua API local

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
  getGames: async (modality: string, series: string): Promise<Game[]> => {
    try {
      const response = await fetch(`${API_URL}/games/${modality}/${series}`);
      // const response = await fetch(`${MOCK_API_URL}/games/`);
      const data = await response.json();
      return data as Game[];
    } catch (error) {
      console.error('Erro ao obter jogos:', error);
      return []
    }
  },
  getRanking: async (modality: string, series: string): Promise<GroupRanking[]> => {
    try {
      const response = await fetch(`${API_URL}/ranking/${modality}/${series}`);
      // const response = await fetch(`${MOCK_API_URL}/ranking`);
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


