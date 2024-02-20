import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { stylesComponent } from './styles';

interface CelulaPartidaProps {
  mandante: string;
  visitante: string;
  golsMandante: number;
  golsVisitante: number;
}

const GameCell: React.FC<CelulaPartidaProps> = ({
  mandante,
  visitante,
  golsMandante,
  golsVisitante,
}) => (
  <View style={[stylesComponent.celulaPartida, stylesComponent.borda]}>
    <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{mandante}</Text>
    <Text style={[stylesComponent.texto, stylesComponent.textoPlacar]}>{`${golsMandante} x ${golsVisitante}`}</Text>
    <Text style={[stylesComponent.texto, stylesComponent.textoTime]}>{visitante}</Text>
  </View>
);

export default GameCell;
