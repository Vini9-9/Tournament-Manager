import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import GamesTable from '@/components/GamesTable/GamesTable';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import api from '@/services/api';
import GamesTableSimulator from '@/components/GamesTableSimulator/GamesTableSimulator';
import HeaderModality from '@/components/HeaderModality/HeaderModality';

export default function TabOneScreen() {
  const [dadosAtualizados, setDadosAtualizados] = useState(false);
  const [jogos, setJogos] = useState<Game[]>([]);
  const [modality, setModality] = useState<string>('FM/A');

  const fetchData = async () => {
    const jogosData = await api.getGames('FM', 'A');
    setJogos(jogosData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <View style={styles.container}>
      <GamesTableSimulator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
