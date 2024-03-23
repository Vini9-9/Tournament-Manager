import { StyleSheet } from 'react-native';

export const stylesComponent = StyleSheet.create({
  celulaPartida: {
    alignItems: 'center',
    width: '85%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: 5,
    marginBottom: 5, // Espaçamento inferior entre as células
    marginHorizontal: 5, // Espaçamento inferior entre as células
    backgroundColor: 'white', // Cor de fundo
  },
  borda: {
    borderWidth: 1,
    borderColor: 'black', // Cor da borda
    borderRadius: 5, // Borda arredondada
  },
  texto: {
    flex: 1,
    textAlign: 'center',
  },
  textoTime: {
    width: 150, // 40% de largura
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  textoPlacar: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold', // Para dar destaque ao placar
  },
});