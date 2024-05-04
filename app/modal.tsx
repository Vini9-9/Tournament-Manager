import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import GamesTable from '@/components/GamesTable/GamesTable';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import api from '@/services/api';
import HeaderOptions from '@/components/HeaderOptions/HeaderOptions';

export default function ModalScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let localities:string[] = []; 
  let optionsData: { label: string; }[] = []; 

  useEffect(() => {
    setLoading(false); // Carrega os jogos iniciais quando o componente for montado
  }, []);

  
  // Função para lidar com a seleção de uma opção na lista suspensa
  const handleOptionChange = async (value: string | undefined) => {
    if (value){
      setLoading(true);
      
      try {
          const nextGames = await api.getNextGames(value);
          setGames(nextGames); // Atualiza o estado dos jogos com os novos jogos obtidos
        } catch (error) {
          console.error('Erro ao obter os próximos jogos:', error);
        } finally {
          setLoading(false); // Desativa o estado de carregamento quando a requisição for concluída
        }
      }
    };
    
  return (
    <View style={styles.container}>
      <HeaderOptions 
        title='Selecione uma localidade:'
        onOptionChange={handleOptionChange}
      />
      {loading ? (
        // Exibe o componente de loading se o estado de carregamento estiver ativo
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
      <GamesTable 
        jogos={games}
        nextGamesEnabled={false}
      />)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
