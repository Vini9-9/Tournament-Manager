import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Button } from 'react-native';
import { Game } from '../../types';
import { stylesComponent } from './styles'
import { styles } from '../../styles/styles'
import moment from 'moment';
import GameCell from '../GameCell/GameCell';
import Icon from 'react-native-vector-icons/FontAwesome';

interface GamesTableProps {
  jogos: Game[];
  nextGamesEnabled: boolean;
}

const GamesTable: React.FC<GamesTableProps> = ({ jogos, nextGamesEnabled=true }) => {
  const formatarData = (data: string) => moment(data).format('DD/MM');

  const checkNearestWeekend = (date: string) => {
    const currentDate = moment();
    let initialDate = currentDate.clone().subtract(1, 'd'); 
    const dateMoment = moment(date, 'YYYY-MM-DD');
    
    let finalDate = currentDate.clone().weekday(7); 
    if (currentDate.weekday() === 0){
      finalDate = currentDate.clone(); 
    }
    return dateMoment.isBetween(initialDate, finalDate)
}
  
  // Função para ordenar os jogos por data e horário
  const sortedJogos = [...jogos].sort((a, b) => {
    const dataA = moment(a.DIA + ' ' + a.HORARIO, 'YYYY-MM-DD HH:mm');
    const dataB = moment(b.DIA + ' ' + b.HORARIO, 'YYYY-MM-DD HH:mm');
    return dataA.diff(dataB);
  });

  const renderRow = (item: Game) => (
    <View style={{alignItems: 'center'}}>
        {item.modalidade ? <Text style={[stylesComponent.textoDestaque, stylesComponent.textoModalidade]}> {item.modalidade}</Text> : ''}
        <Text style={stylesComponent.textoDestaque}> Grupo {item.GRUPO}</Text>
      <View style={stylesComponent.item}>
        {item.LOCAL &&
          <>
          <View style={stylesComponent.localIcon}>
            <Icon name="map-marker" size={20} color="black" />
          </View>
          <Text style={stylesComponent.textoEsquerda}>{item.LOCAL}</Text>
        </>}
        <Text style={stylesComponent.textoDireita}>
          {item.DIA && formatarData(item.DIA)} {item.DIA && '|'} {item.HORARIO}
        </Text>
      </View>
        <GameCell
          nextGame={nextGamesEnabled && checkNearestWeekend(item.DIA)}
          mandante={item.Mandante}
          visitante={item.Visitante}
          golsMandante={item.GOLS_MANDANTE}
          golsVisitante={item.GOLS_VISITANTE}
      />
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <FlatList
          data={sortedJogos}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
    </ScrollView>
  );
};

export default GamesTable;
