import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { stylesComponent } from './styles';
import { Game } from '@/types';

interface CelulaPartidaSimuladaProps {
  updateRanking: (game: Game, golsMandante: number, golsVisitante: number) => void;
  game: Game 
}

const GameCellSimulator: React.FC<CelulaPartidaSimuladaProps> = ({
  updateRanking,
  game
}) => {
  const minValue = 0; // Valor mínimo
  const maxValue = 40; // Valor máximo

  const [golsMandante, setGolsMandante] = useState<number | string>('');
  const [golsVisitante, setGolsVisitante] = useState<number | string>('');

  useEffect(() => {
    if (parseInt(golsMandante.toString()) > -1 &&
    parseInt(golsVisitante.toString()) > -1) {
      handleBothInputsFilled();
    }
  }, [golsMandante, golsVisitante]);

  const handleGolsMandanteChange = (text: string) => {
    const value = parseInt(text, 10) || 0;
    setGolsMandante(Math.min(maxValue, Math.max(minValue, value)));
  };

  const handleGolsVisitanteChange = (text: string) => {
    const value = parseInt(text, 10) || 0;
    setGolsVisitante(Math.min(maxValue, Math.max(minValue, value)));
  };
  
  const handleBothInputsFilled = () => {
    updateRanking(game, parseInt(golsMandante.toString()), parseInt(golsVisitante.toString()))
  };
  return (
    <View style={{alignItems: 'center'}}>
      <View style={stylesComponent.item}>
        <Text style={stylesComponent.textoDestaque}> Grupo {game.GRUPO}</Text>
      </View>
    {game.SIMULADOR.toString().toLowerCase() == 'true' ? (
      <View style={[stylesComponent.celulaPartida, stylesComponent.borda]}>
          <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
            {game.Mandante}
          </Text>
        <View style={styles.inputView}>
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
        </View>
          <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
            {game.Visitante}
          </Text>
      </View>
    ) : (
      // <View style={[stylesComponent.celulaPartida, stylesComponent.borda, stylesComponent.disabledBackground]}>
      //   <View style={styles.container}>
      //     <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
      //       {game.Mandante}
      //     </Text>
      //   </View>
      //   <Text style={[stylesComponent.texto, stylesComponent.textoPlacar]}>
      //     {game.GOLS_MANDANTE} x {game.GOLS_VISITANTE}
      //   </Text>
      //   <View style={styles.container}>
      //     <Text numberOfLines={2} style={[stylesComponent.texto, styles.teamName]}>
      //       {game.Visitante}
      //     </Text>
      //   </View>
      // </View>
      <View style={[stylesComponent.celulaPartida, stylesComponent.borda, stylesComponent.disabledBackground]}>
        <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{game.Mandante}</Text>
        <Text style={[stylesComponent.texto, stylesComponent.textoPlacar]}>{`${game.GOLS_MANDANTE} x ${game.GOLS_VISITANTE}`}</Text>
        <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{game.Visitante}</Text>
      </View>
    )}
  </View>
)};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row', 
  },
  input: {
    width: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black', // Cor da borda
    borderRadius: 5, // Raio do canto da borda
  },
  teamName: {
    marginHorizontal: 5,
    width: 130,
    flexWrap: 'wrap',
    // height: 40,
  },
  container:{
    // marginHorizontal: 2.5,
    // flexDirection: 'row',
  }
});

export default GameCellSimulator;
