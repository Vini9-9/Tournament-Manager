import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import gamesIcon from '../../assets/icons/games_icon.png';
import rankingIcon from '../../assets/icons/ranking_icon.png';
import simulatorIcon from '../../assets/icons/simulator_icon.png';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
          // tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          tabBarIcon: ({  size  }) => ( 
            <Image 
              source={gamesIcon} 
              style={{ width: size, height: size }} 
              />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
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