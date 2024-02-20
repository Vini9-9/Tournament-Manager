import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Button } from 'react-native';
import { Game, GroupRanking, Team } from '../../types';
import { stylesComponent } from './styles'
import { styles } from '../../styles/styles'
import moment from 'moment';
import GameCellSimulator from '../GameCellSimulator/GameCellSimulator';
import RankingTable from '../RankingTable/RankingTable';
import api from '@/services/api';

interface GamesTableProps {
  jogos: Game[];
}

const GamesTableSimulator: React.FC<GamesTableProps> = ({ jogos }) => {
  const [ranking, setRanking] = useState<GroupRanking[]>([]);

  const fetchData = async () => {
    const rankingData = await api.getRankingSimulator();
    setRanking(rankingData);
  };
  
    useEffect(() => {
      fetchData();
    }, []);
  const formatarData = (data: string) => moment(data).format('DD/MM');

  const renderRow = (item: Game) => (
    <View>
      <View style={stylesComponent.item}>
        <Text style={stylesComponent.textoDestaque}> Grupo {item.GRUPO}</Text>
      </View>
        <GameCellSimulator
          mandante={item.Mandante}
          visitante={item.Visitante}
        />
        
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <FlatList
          data={jogos}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
      <RankingTable ranking={ranking} />
    </ScrollView>
  );
};

export default GamesTableSimulator;
