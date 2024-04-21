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
}

const GamesTable: React.FC<GamesTableProps> = ({ jogos }) => {
  const formatarData = (data: string) => moment(data).format('DD/MM');

  const checkNearestWeekend = (date: string) => {
    const currentDate = moment();
    console.log('hoje', currentDate.format('DD-MM-YYYY'))
    console.log('hoje', currentDate.weekday())
    let initialDate = currentDate.clone().subtract(2, 'd'); 

    const dateMoment = moment(date, 'YYYY-MM-DD');
    
    console.log('initial', initialDate.format('DD-MM-YYYY'))
    const finalDate = initialDate.clone().weekday(7); 

    return dateMoment.isBetween(initialDate, finalDate)
}
  

  const renderRow = (item: Game) => (
    <View style={{alignItems: 'center'}}>
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
          nextGame={checkNearestWeekend(item.DIA)}
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
          data={jogos}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => renderRow(item)}
        />
      </View>
    </ScrollView>
  );
};

export default GamesTable;
