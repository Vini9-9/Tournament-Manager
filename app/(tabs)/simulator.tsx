import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Flag } from '@/types';
import api from '@/services/api';
import GamesTableSimulator from '@/components/GamesTableSimulator/GamesTableSimulator';
import Footer from '@/components/Footer';
import GamesPlayoff from '@/components/GamesPlayoff/GamesPlayoff';

export default function TabOneScreen() {
  const [flags, setFlag] = useState<Flag>({});

  const fetchData = async () => {
    const flags = await api.getFlag();
    setFlag(flags)
    console.log('flags', flags)
  };
  
  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <View style={styles.container}>
      { 
        flags.playoff ?
        <GamesPlayoff/> :
        <GamesTableSimulator/>
      }
      <Footer></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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