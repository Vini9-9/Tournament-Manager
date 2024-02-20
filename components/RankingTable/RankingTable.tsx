import { GroupRanking, Team } from '@/types';
import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { stylesComponent } from './styles';

interface RankingTableProps {
  ranking: GroupRanking[];
}

const RankingTable: React.FC<RankingTableProps> = ({ ranking }) => {

  const renderRow = (time: Team, index: number) => (
    <View style={stylesComponent.item}>
      <Text style={stylesComponent.texto}>{index+1}º</Text>
      <Text style={[stylesComponent.texto, stylesComponent.textoTimes]}>{time.Time}</Text>
      <Text style={stylesComponent.texto}>{time.Pontos}</Text>
      <Text style={stylesComponent.texto}>{time.Jogos}</Text>
      <Text style={stylesComponent.texto}>{time.V}</Text>
      <Text style={stylesComponent.texto}>{time.E}</Text>
      <Text style={stylesComponent.texto}>{time.D}</Text>
      <Text style={stylesComponent.texto}>{time.Gols_Pro}</Text>
      <Text style={stylesComponent.texto}>{time.Gols_Contra}</Text>
      <Text style={stylesComponent.texto}>{time.Saldo}</Text>
    </View>
  );

  const renderHeader = (ranking: GroupRanking) => (
    <View style={[stylesComponent.item, stylesComponent.cabecalho]}>
      <Text style={stylesComponent.textoCabecalho}>Col.</Text>
      <Text style={stylesComponent.textoGrupo}>Grupo {ranking.group}</Text>
      <Text style={stylesComponent.textoCabecalho}>P</Text>
      <Text style={stylesComponent.textoCabecalho}>J</Text>
      <Text style={stylesComponent.textoCabecalho}>V</Text>
      <Text style={stylesComponent.textoCabecalho}>E</Text>
      <Text style={stylesComponent.textoCabecalho}>D</Text>
      <Text style={stylesComponent.textoCabecalho}>GP</Text>
      <Text style={stylesComponent.textoCabecalho}>GC</Text>
      <Text style={stylesComponent.textoCabecalho}>S</Text>
    </View>
  );

  const renderGroup = ({ item }: { item: GroupRanking }) => (
    <ScrollView horizontal >
      <View style={stylesComponent.container}>
        {renderHeader(item)}
        <FlatList
          data={item.ranking}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={(item, index) => item.ID}
        />
      </View>
    </ScrollView>
  );

  return (
    <ScrollView >
        <View style={stylesComponent.container}>
            {ranking.map((item, index) => (
            <View style={stylesComponent.item}>
                {renderGroup({ item })}
            </View>
            ))}
        </View>
    </ScrollView>
  );
};


export default RankingTable;
