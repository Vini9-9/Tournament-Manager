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

  const modality = "Futsal Masculino"
  const series = "Serie A"

  const fetchData = async () => {
    const jogosData = await api.getGames('FM', 'A');
    setJogos(jogosData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      const data = value.split('/');
      const newGames = await api.getGames(data[0], data[1]);
      setJogos(newGames); // Atualiza o estado dos jogos com os novos jogos obtidos
    }
  };
    
  return (
    <View style={styles.container}>
      <HeaderModality 
        onOptionChange={handleOptionChange}
      />
      <GamesTableSimulator jogos={jogos} />
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
