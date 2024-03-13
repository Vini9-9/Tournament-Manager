import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, } from 'react-native';
import { Confrontations, Game, GroupRanking, Team } from '../../types';
import { styles } from '../../styles/styles'
import GameCellSimulator from '../GameCellSimulator/GameCellSimulator';
import RankingTable from '../RankingTable/RankingTable';
import api from '@/services/api';
import HeaderModality from '../HeaderModality/HeaderModality';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GamesTableSimulator: React.FC = () => {
  const [jogos, setJogos] = useState<Game[]>([]);
  const [ranking, setRanking] = useState<GroupRanking[]>([]);
  const [confrontation, setConfrontation] = useState<Confrontations>({});
  const [updatedGamesByTeam, setUpdatedGamesByTeam] = useState<{ [teamName: string]: Set<string> }>({});

  const fetchData = async ( modality: string[]) => {
    const rankingData = await api.getRanking(modality[0], modality[1]);
    const jogosData = await api.getGames(modality[0], modality[1]);
    const confrontationData = await api.getConfrontations(modality[0], modality[1]);
    setJogos(jogosData);
    setRanking(rankingData);
    setConfrontation(confrontationData);
    saveRankingToStorage(rankingData, confrontationData)
  };

  // Função para recuperar o ranking armazenado no AsyncStorage
  const getRankingFromStorage = async () => {
    try {
      // const jsonRanking = sessionStorage.getItem('ranking');
      const jsonRanking = await AsyncStorage.getItem('ranking');
      if (jsonRanking) {
        const parsedRanking: GroupRanking[] = JSON.parse(jsonRanking);
        setRanking(parsedRanking);
      } else {
        fetchData(['FM', 'A']);
      }
    } catch (error) {
      console.error('Erro ao recuperar o ranking do AsyncStorage:', error);
    }
  };

  // Função para salvar o ranking no AsyncStorage
  const saveRankingToStorage = async (newRanking: GroupRanking[], newConfrontation? : Confrontations ) => {
    try {
      const jsonRanking = JSON.stringify(newRanking);
      const jsonConfrontation = JSON.stringify(newConfrontation);
      await AsyncStorage.setItem('ranking', JSON.stringify(jsonRanking));
      await AsyncStorage.setItem('confrontation', JSON.stringify(jsonConfrontation));
      // sessionStorage.setItem('ranking', jsonRanking);
      // sessionStorage.setItem('confrontation', jsonConfrontation);
    } catch (error) {
      console.error('Erro ao salvar dados do ranking no AsyncStorage:', error);
    }
  };

  useEffect(() => {
    clearAllData();
    getRankingFromStorage();
  }, []);

  const rollbackGame = (team: Team, meu_placar: number, placar_adversario: number) => {
    
    const dados_ranking_team = team

    if (meu_placar > placar_adversario) {
      dados_ranking_team.Pontos = parseInt(dados_ranking_team.Pontos.toString(), 10) - 3;
      dados_ranking_team.V = parseInt(dados_ranking_team.V.toString(), 10) - 1;
  } else if (meu_placar === placar_adversario) {
      dados_ranking_team.Pontos = parseInt(dados_ranking_team.Pontos.toString(), 10) - 1;
      dados_ranking_team.E = parseInt(dados_ranking_team.E.toString(), 10) - 1;
  } else {
      dados_ranking_team.D = parseInt(dados_ranking_team.D.toString(), 10) - 1;
  }
    
    dados_ranking_team.Gols_Pro = parseInt(dados_ranking_team.Gols_Pro.toString(), 10) - meu_placar;
    
    dados_ranking_team.Gols_Contra = parseInt(dados_ranking_team.Gols_Contra.toString(), 10) - placar_adversario;
    
    dados_ranking_team.Saldo = parseInt(dados_ranking_team.Gols_Pro.toString(), 10) - parseInt(dados_ranking_team.Gols_Contra.toString(), 10);
  }

  const updateRankingRow = (game: Game, team: Team, golsMandante: number, golsVisitante: number) => {
    const gameUpdated = jogos.find(jogo => jogo.ID === game.ID);
    if(gameUpdated){
      let meu_placar = golsVisitante
      let placar_adversario = golsMandante
      let meu_placar_rollback = gameUpdated.GOLS_VISITANTE
      let placar_adversario_rollback = gameUpdated.GOLS_MANDANTE
      
      if(team.Time == game.Mandante){
        meu_placar = golsMandante
        placar_adversario = golsVisitante
        meu_placar_rollback = gameUpdated.GOLS_MANDANTE
        placar_adversario_rollback = gameUpdated.GOLS_VISITANTE
      }
      
      if(gameUpdated.GOLS_MANDANTE.toString() != "" || gameUpdated.GOLS_VISITANTE.toString() != ""){
        
        rollbackGame(team, 
          parseInt(meu_placar_rollback.toString()),
          parseInt(placar_adversario_rollback.toString()))
      }
  
      const dados_ranking_team = team
  
      if (meu_placar > placar_adversario) {
        dados_ranking_team.Pontos = parseInt(dados_ranking_team.Pontos.toString(), 10) + 3;
        dados_ranking_team.V = parseInt(dados_ranking_team.V.toString(), 10) + 1;
    } else if (meu_placar === placar_adversario) {
        dados_ranking_team.Pontos = parseInt(dados_ranking_team.Pontos.toString(), 10) + 1;
        dados_ranking_team.E = parseInt(dados_ranking_team.E.toString(), 10) + 1;
    } else {
        dados_ranking_team.D = parseInt(dados_ranking_team.D.toString(), 10) + 1;
    }
      
      dados_ranking_team.Gols_Pro = parseInt(dados_ranking_team.Gols_Pro.toString(), 10) + meu_placar;
      
      dados_ranking_team.Gols_Contra = parseInt(dados_ranking_team.Gols_Contra.toString(), 10) + placar_adversario;
      
      dados_ranking_team.Saldo = parseInt(dados_ranking_team.Gols_Pro.toString(), 10) - parseInt(dados_ranking_team.Gols_Contra.toString(), 10);
    }
  }

  const updateGame = (updatedGame: Game) => {
      // Encontre o índice do jogo que você deseja atualizar
      const index = jogos.findIndex(game => game.ID === updatedGame.ID);
      
      // Se o jogo não foi encontrado, retorne o array original
      if (index === -1) {
        return jogos;
      }
  
      // Crie uma cópia do array
      const updatedGames = [...jogos];
      
      // Atualize o jogo na cópia do array
      updatedGames[index] = updatedGame;
      
      return updatedGames;
    };
  

  const updateDataRanking = (game: Game, golsMandante: number, golsVisitante: number) => {
    let mandanteFound = false;
    let visitanteFound = false;
  
    setRanking(prevRanking => {
      const updatedRanking = prevRanking.map(groupRanking => {
        groupRanking.ranking.forEach(row => {
          if (row.Time === game.Mandante) {
            mandanteFound = true;
            if (!updatedGamesByTeam[row.Time]) {
              updatedGamesByTeam[row.Time] = new Set();
            }
            if (!updatedGamesByTeam[row.Time].has(game.ID)) {
              row.Jogos++;
              updatedGamesByTeam[row.Time].add(game.ID);
            }
            updateRankingRow(game, row, golsMandante, golsVisitante);
          }
          if (row.Time === game.Visitante) {
            visitanteFound = true;
            if (!updatedGamesByTeam[row.Time]) {
              updatedGamesByTeam[row.Time] = new Set();
            }
            if (!updatedGamesByTeam[row.Time].has(game.ID)) {
              row.Jogos++;
              updatedGamesByTeam[row.Time].add(game.ID);
            }
            updateRankingRow(game, row, golsMandante, golsVisitante);
          }
        });
        return groupRanking;
      });
  
      // Se ambos mandante e visitante foram encontrados, execute setGameUpdated
      if (mandanteFound && visitanteFound) {
          game.GOLS_MANDANTE = golsMandante;
          game.GOLS_VISITANTE = golsVisitante;
          // jogos = updateGame(game);
          setJogos(updateGame(game))
          updateClashConfrontation(game, golsMandante, golsVisitante)
          mandanteFound = false;
          visitanteFound = false;
      }
  
      saveRankingToStorage(updatedRanking, confrontation);
      return updatedRanking;
    });
  };

  const updateClashConfrontation = (game: Game, golsMandante: number, golsVisitante: number) => {
    // Verificar se os times do jogo estão presentes no hook confrontation
    if (confrontation.hasOwnProperty(game.Mandante) && confrontation.hasOwnProperty(game.Visitante)) {
      // Verificar o resultado do jogo
      if (golsMandante > golsVisitante) {
          // Se o mandante ganhou, atualize o confronto
          confrontation[game.Mandante][game.Visitante] = game.Mandante;
          confrontation[game.Visitante][game.Mandante] = game.Mandante;
      } else if (golsMandante < golsVisitante) {
          // Se o visitante ganhou, atualize o confronto
          confrontation[game.Mandante][game.Visitante] = game.Visitante;
          confrontation[game.Visitante][game.Mandante] = game.Visitante;
      } else {
          // Se foi empate, atualize o confronto para o mandante
          confrontation[game.Mandante][game.Visitante] = 'E';
          confrontation[game.Visitante][game.Mandante] = 'E';
      }
    } else {
      // Se um dos times não estiver presente no confrontation, adicione-o
      if (!confrontation.hasOwnProperty(game.Mandante)) {
        confrontation[game.Mandante] = {};
      }
      if (!confrontation.hasOwnProperty(game.Visitante)) {
          confrontation[game.Visitante] = {};
      }
      // Atualize o confronto após adicionar os times
      updateClashConfrontation(game, golsMandante, golsVisitante);
      }
  }
  
  const setTeamAhead = (teamOne: Team, teamTwo: Team) => {
    // Verificar se o hook confrontation contém a chave teamOne.Time
    if (confrontation.hasOwnProperty(teamOne.Time)) {
      // Verificar se a chave teamTwo.Time existe dentro dos confrontos de teamOne.Time
      if (confrontation[teamOne.Time].hasOwnProperty(teamTwo.Time)) {
          const result = confrontation[teamOne.Time][teamTwo.Time];
          console.log(`O vencedor do confronto entre ${teamOne.Time} e ${teamTwo.Time} é: ${result}`);
          // Faça o que quiser com o resultado aqui
          return result;
      } else {
          console.log(`Não foi encontrado o confronto entre ${teamOne.Time} e ${teamTwo.Time}`);
      }
    } else {
        console.log(`Não foi encontrado o time ${teamOne.Time} nos confrontos`);
    }
  }

  const sortRanking = (ranking: GroupRanking[]) => {
    ranking.forEach(groupRanking => {
      groupRanking.ranking.sort((a, b) => {
        // Primeiro critério: Pontos (em ordem decrescente)
        const pontosA = parseInt(a.Pontos.toString());
        const pontosB = parseInt(b.Pontos.toString());
        if (pontosA !== pontosB) {
          return pontosB - pontosA;
        }
        // TODO regra segundo  
        if (pontosA === pontosB) {
          // Chamar setTeamAhead passando os dados dos dois times
          const teamAhead = setTeamAhead(a, b);
            if (teamAhead != 'E') {
                // O time que venceu o confronto está à frente
                if (teamAhead === a.Time) {
                    return -1; // a vem antes de b
                } else {
                    return 1; // b vem antes de a
                }
            }
        }
        
        // Segundo critério: Saldo (em ordem decrescente)
        const saldoA = parseInt(a.Saldo.toString());
        const saldoB = parseInt(b.Saldo.toString());
        if (saldoA !== saldoB) {
          return saldoB - saldoA;
        }
        // Terceiro critério: Gols_Pro (em ordem decrescente)
        const golsProA = parseInt(a.Gols_Pro.toString());
        const golsProB = parseInt(b.Gols_Pro.toString());
        return golsProB - golsProA;
      });
    });
  };
  
  const updateRanking = (game: Game, golsMandante: number, golsVisitante: number) => {
    updateDataRanking(game, golsMandante, golsVisitante)
    sortRanking(ranking)
  };

  const renderRow = (item: Game) => (
    <View key={item.ID}>
        <GameCellSimulator
          updateRanking={updateRanking}
          game={item}
        />
    </View>
  );

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully!');
    } catch (e) {
      console.error('Failed to clear data:', e);
    }
  }

  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      const data = value.split('/');
      const newGames = await api.getGames(data[0], data[1]);
      setJogos(newGames); // Atualiza o estado dos jogos com os novos jogos obtidos
      clearAllData()
      fetchData(data)
    }
  };

  return (
    <>
    <HeaderModality 
        onOptionChange={handleOptionChange}
      />
    <ScrollView horizontal>
      <View style={styles.container}>
      <FlatList
        data={jogos.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO))}
        renderItem={({ item }) => renderRow(item)}
      />
      </View>
      <RankingTable ranking={ranking} numberToQualify={4} />
    </ScrollView>
    </>
  );
};

export default GamesTableSimulator;
