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

  const renderRow = (item: Game) => (
    <View>
      <View style={stylesComponent.item}>
        <View style={stylesComponent.localIcon}>
          <Icon name="map-marker" size={20} color="black" />
        </View>
        <Text style={stylesComponent.textoEsquerda}>{item.LOCAL}</Text>
        <Text style={stylesComponent.textoDestaque}> Grupo {item.GRUPO}</Text>
        <Text style={stylesComponent.textoDireita}>
          {item.DIA && formatarData(item.DIA)} {item.DIA && '|'} {item.HORARIO}
        </Text>
      </View>
        <GameCell
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
