import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import GamesTable from '@/components/GamesTable/GamesTable';
import { useEffect, useState } from 'react';
import { Game, Modality } from '@/types';
import api from '@/services/api';
import HeaderModality from '@/components/HeaderModality/HeaderModality';

export default function TabOneScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [options, setOptions] = useState<Modality[]>([]);

      // Função para lidar com a seleção de uma opção na lista suspensa
  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      const data = value.split('/');
      const newGames = await api.getGames(data[0], data[1]);
      setGames(newGames); // Atualiza o estado dos jogos com os novos jogos obtidos
    }
    };
    
  return (
    <View style={styles.container}>
      <HeaderModality 
        onOptionChange={handleOptionChange}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <Button title="Recarregar Dados" onPress={fetchData} /> */}
      <GamesTable jogos={games} />
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
