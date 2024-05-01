import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useState } from 'react';
import { GroupRanking, Modality, Team } from '@/types';
import api from '@/services/api';
import RankingTable from '@/components/RankingTable/RankingTable';
import HeaderModality from '@/components/HeaderModality/HeaderModality';
import Footer from '@/components/Footer';
import Table from '@/components/RankingTable/Table';
import GamesTable from '@/components/GamesTable/GamesTable';

export default function TabTwoScreen() {
  const [selectedOption, setSelectedOption] = useState<string>('FM/A');
  const [ranking, setRanking] = useState<GroupRanking[]>([]);

  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      setSelectedOption(value); // Atualiza o estado com a nova opção selecionada
      const data = value.split('/');
      const ranking = await api.getRanking(data[0], data[1]);
      setRanking(ranking); // Atualiza o estado dos jogos com os novos jogos obtidos
    }
    };
    
  return (
    <View style={styles.container}>
      <HeaderModality 
        onOptionChange={handleOptionChange}
        />
      <ScrollView>
        <RankingTable ranking={ranking} numberToQualify={4} />
      </ScrollView>
      <Footer></Footer>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});