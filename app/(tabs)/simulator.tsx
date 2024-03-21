import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import api from '@/services/api';
import GamesTableSimulator from '@/components/GamesTableSimulator/GamesTableSimulator';
import Footer from '@/components/Footer';

export default function TabOneScreen() {
  const [jogos, setJogos] = useState<Game[]>([]);

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
      <Footer></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});