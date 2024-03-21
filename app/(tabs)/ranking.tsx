import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useState } from 'react';
import { GroupRanking, Modality, Team } from '@/types';
import api from '@/services/api';
import RankingTable from '@/components/RankingTable/RankingTable';
import HeaderModality from '@/components/HeaderModality/HeaderModality';
import Footer from '@/components/Footer';
import Table from '@/components/RankingTable/Table';

export default function TabTwoScreen() {
  const [selectedOption, setSelectedOption] = useState<string>('FM/A');
  const [ranking, setRanking] = useState<GroupRanking[]>([]);
  const [options, setOptions] = useState<Modality[]>([]);

  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      setSelectedOption(value); // Atualiza o estado com a nova opção selecionada
      const data = value.split('/');
      const ranking = await api.getRanking(data[0], data[1]);
      setRanking(ranking); // Atualiza o estado dos jogos com os novos jogos obtidos
    }
    };
    
  return (
    <>
      <HeaderModality
        onOptionChange={handleOptionChange}
      />
      <RankingTable ranking={ranking} numberToQualify={4} />
      <Footer></Footer>
    </>
    // <View style={styles.container}>
    // </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  containerClean: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  containerTitle: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});