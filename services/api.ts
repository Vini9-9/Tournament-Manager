import { Game, GroupRanking, Modality, Team } from '../types';

const API_URL = 'http://127.0.0.1:5001/api'; // ou o endereço da sua API local
const MOCK_API_URL = 'https://6398a58f29930e2bb3bd4ef3.mockapi.io/api/'; // ou o endereço da sua API local
const MOCK_API_MODALITIES_URL = 'https://run.mocky.io/v3/ad07e52d-b970-4488-b484-5045fccbf236'; // ou o endereço da sua API local

const api = {
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
      console.log(`${API_URL}/games/${modality}/${series}`)
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
  getRankingSimulator: async (): Promise<GroupRanking[]> => {
    try {
      const response = await fetch(`${API_URL}/ranking?simulator=True`);
      const data = await response.json();
      return data as GroupRanking[];
    } catch (error) {
      console.error('Erro ao obter ranking:', error);
      return []
    }
  },

};

export default api;