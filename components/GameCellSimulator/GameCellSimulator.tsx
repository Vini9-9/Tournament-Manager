import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { stylesComponent } from './styles';

interface CelulaPartidaSimuladaProps {
  mandante: string;
  visitante: string;
}

const GameCellSimulator: React.FC<CelulaPartidaSimuladaProps> = ({
  mandante,
  visitante,
}) => {
  const minValue = 0; // Valor mínimo
  const maxValue = 40; // Valor máximo

  const [golsMandante, setGolsMandante] = useState<number | string>('');
  const [golsVisitante, setGolsVisitante] = useState<number | string>('');

  const handleGolsMandanteChange = (text: string) => {
    const value = parseInt(text, 10) || 0;
    setGolsMandante(Math.min(maxValue, Math.max(minValue, value)));
  };

  const handleGolsVisitanteChange = (text: string) => {
    const value = parseInt(text, 10) || 0;
    setGolsVisitante(Math.min(maxValue, Math.max(minValue, value)));
  };
  
  return (
  <View style={[stylesComponent.celulaPartida, stylesComponent.borda]}>
    <View style={styles.container}>
      <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
          {mandante}
      </Text>
    </View>
    <TextInput
        style={[styles.input, stylesComponent.texto]}
        value={golsMandante.toString()}
        onChangeText={handleGolsMandanteChange}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="grey"
      />
    <Text style={[stylesComponent.texto, stylesComponent.textoPlacar]}>
      x
    </Text>
    <TextInput
        style={[styles.input, stylesComponent.texto]}
        value={golsVisitante.toString()}
        onChangeText={handleGolsVisitanteChange}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="grey"
      />
      <View style={styles.container}>
        <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
            {visitante}
        </Text>
      </View>
  </View>
)};

const styles = StyleSheet.create({
  input: {
    width: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black', // Cor da borda
    borderRadius: 5, // Raio do canto da borda
  },
  teamName: {
    margin: 5,
    width: 130,
    flexWrap: 'wrap',
    height: 40,
  },
  container:{
    marginHorizontal: 2.5,
    // backgroundColor: 'red',
    flexDirection: 'row',
  }
});

export default GameCellSimulator;
