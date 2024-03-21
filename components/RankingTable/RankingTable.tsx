import { GroupRanking, Team } from '@/types';
import React from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { stylesComponent } from './styles';

interface RankingTableProps {
  ranking: GroupRanking[] | string;
  numberToQualify: number;
}

const RankingTable: React.FC<RankingTableProps> = ({ ranking, numberToQualify }) => {

  const { width } = useWindowDimensions();

  const renderRow = (time: Team, index: number) => {
    let rowStyle: any = stylesComponent.row;
    if (index < numberToQualify) { // Altere x para o número de linhas que deseja destacar
      rowStyle = [stylesComponent.row, stylesComponent.primeirasLinhasBackground];
    }
    return (
    <View style={rowStyle}>
      <Text style={stylesComponent.textoMenor}>{index+1}º</Text>
      <Text style={[stylesComponent.texto, stylesComponent.textoTimes]}>{time.Time}</Text>
      <Text style={stylesComponent.textoNormal}>{time.Pontos}</Text>
      <Text style={stylesComponent.textoNormal}>{time.Jogos}</Text>
      <Text style={stylesComponent.textoNormal}>{time.V}</Text>
      <Text style={stylesComponent.textoNormal}>{time.E}</Text>
      <Text style={stylesComponent.textoNormal}>{time.D}</Text>
      <Text style={stylesComponent.textoNormal}>{time.Gols_Pro}</Text>
      <Text style={stylesComponent.textoNormal}>{time.Gols_Contra}</Text>
      <Text style={stylesComponent.textoNormal}>{time.Saldo}</Text>
    </View>
  )};

  const renderHeader = (ranking: GroupRanking) => (
    <View style={[stylesComponent.cabecalho]}>
      <Text style={stylesComponent.textoMenorCabecalho}>Col.</Text>
      <Text style={stylesComponent.textoGrupo}>Grupo {ranking.group}</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>P</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>J</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>V</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>E</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>D</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>GP</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>GC</Text>
      <Text style={stylesComponent.textoNormalCabecalho}>S</Text>
    </View>
  );

  const renderGroup = ({ item }: { item: GroupRanking }) => (
    <ScrollView horizontal >
      <View style={stylesComponent.listContainer}>
        {renderHeader(item)}
        <FlatList
          data={item.ranking}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={(item, index) => item.ID}
        />
      </View>
    </ScrollView>
  );

  // Se o ranking estiver disponível e for um array, renderiza os grupos
  if (ranking) {
    if (typeof ranking === 'string') {
      ranking = JSON.parse(ranking) as GroupRanking[];
    }
    return (
      <>
        {ranking.map((item, index) => (
          <View style={[stylesComponent.container,
                width > 470 && { alignSelf: 'center' }]} 
                key={`group_${index}`}>
            {renderGroup({ item })}
          </View>
        ))}
      </>
    );
  } else {
    // Se o ranking estiver definido, mas não for um array, exiba uma mensagem de erro
    return (
      <View style={[stylesComponent.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
};


export default RankingTable;
