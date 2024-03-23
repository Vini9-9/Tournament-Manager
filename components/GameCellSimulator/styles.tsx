import { StyleSheet } from 'react-native';

export const stylesComponent = StyleSheet.create({
  celulaPartida: {
    width: '90%',
    flexDirection: 'row',
    padding: 10,
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
    alignSelf: 'center',
  },
  textoTime: {
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  textoPlacar: {
    flex: 1,
    marginHorizontal: 2,
    fontWeight: 'bold', // Para dar destaque ao placar
  },
  textoDestaque: {
    flex: 1,
    // color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // padding: 10,
    marginBottom: 0, // Espaçamento inferior entre as células
    marginTop: 10, // Espaçamento inferior entre as células
    marginHorizontal: 5,
    backgroundColor: 'white', // Cor de fundo
  },
  disabledBackground: {
    backgroundColor: 'silver'
  }
});