import React from 'react';
import { Tabs } from 'expo-router';
import { Image, TouchableOpacity, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { StyleSheet } from 'react-native';

import gamesIcon from '../../assets/icons/games_icon.png';
import rankingIcon from '../../assets/icons/ranking_icon.png';
import simulatorIcon from '../../assets/icons/simulator_icon.png';


const OutlineButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jogos',
          tabBarIcon: ({  size  }) => ( 
            <Image 
              source={gamesIcon} 
              style={{ width: size, height: size }} 
              />
          ),
          headerRight: () => (<OutlineButton title="Jogos da rodada" onPress={() => navigation.navigate('nextGames')} />)
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Classificação',
          tabBarIcon: ({  size  }) => ( 
            <Image 
              source={rankingIcon} 
              style={{ width: size, height: size }} 
              />
          ),
        }}
      />
      <Tabs.Screen
        name="simulator"
        options={{
          title: 'Simulador',
          tabBarIcon: ({  size  }) => ( 
            <Image 
              source={simulatorIcon} 
              style={{ width: size, height: size }} 
              />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#235C9C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#235C9C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});