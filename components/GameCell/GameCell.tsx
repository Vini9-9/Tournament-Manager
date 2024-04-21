import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { stylesComponent } from './styles';

interface CelulaPartidaProps {
  nextGame: boolean;
  mandante: string;
  visitante: string;
  golsMandante: number;
  golsVisitante: number;
}

const GameCell: React.FC<CelulaPartidaProps> = ({
  nextGame,
  mandante,
  visitante,
  golsMandante,
  golsVisitante,
}) => {
  let rowStyle: any = [stylesComponent.celulaPartida, stylesComponent.borda];
    if (nextGame) { // Altere x para o número de linhas que deseja destacar
      rowStyle = [stylesComponent.celulaPartida, stylesComponent.borda, stylesComponent.destaque];
    }
  return (
    <View style={rowStyle}>
      <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{mandante}</Text>
      <Text style={[stylesComponent.texto, stylesComponent.textoPlacar]}>{`${golsMandante} x ${golsVisitante}`}</Text>
      <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{visitante}</Text>
    </View>
)};

export default GameCell;