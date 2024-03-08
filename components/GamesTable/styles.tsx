import { StyleSheet } from 'react-native';

export const stylesComponent = StyleSheet.create({

    item: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'flex-start',
      // padding: 10,
      marginBottom: 0, // Espaçamento inferior entre as células
      marginTop: 10, // Espaçamento inferior entre as células
      marginHorizontal: 5,
      backgroundColor: 'white', // Cor de fundo
    },
    textoDireita: {
      flex: 1,
      textAlign: 'right', // Ajuste para alinhar o texto à direita
      width: 170,
    },
    textoEsquerda: {
      flex: 1,
      textAlign: 'left', // Ajuste para alinhar o texto à esquerda
      width: 100,
      marginLeft: 5,
    },
    textoDestaque: {
      flex: 1,
      // color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      marginBottom: -10,
      marginTop: 10,
    },
    texto: {
      flex: 1,
      textAlign: 'center',
    },
    localIcon: {
      marginRight: 5,
    },
  });