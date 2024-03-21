import { StyleSheet } from 'react-native';

export const stylesComponent = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 5
      },
      listContainer: {
        flex: 1,
      },
      cabecalho: {
        flexDirection: 'row',
        backgroundColor: '#7030A0',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
      },
      row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: .5,
        marginHorizontal: 1,
        elevation: 1,
        borderRadius: 3,
        paddingVertical: 8,
        backgroundColor: "#fff",
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: 500
      },
      textoNormalCabecalho: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        width: 35,
      },
      textoMenorCabecalho: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        width: 25,
      },
      textoNormal: {
        flex: 1,
        width: 35,
        color: 'black',
        textAlign: 'center',
      },
      textoMenor: {
        flex: 1,
        width: 25,
        color: 'black',
        textAlign: 'center',
      },
      texto: {
        flex: 1,
        color: 'black'
      },
      textoTimes: {
        minWidth: 100, // Limita a largura máxima da célula do time
        textAlign: 'left', // Alinha o texto do time à esquerda
        flexWrap: 'wrap', // Adiciona quebra de linha ao texto do time
      },
      textoGrupo: {
        color: 'white',
        textAlign: 'left', // Alinha o texto do time à esquerda
        fontWeight: 'bold',
        width: 100,
      },
      primeiraColuna: {
        flex: 3,
        maxWidth: 150,
      },
      primeirasLinhasBackground: {
        backgroundColor: '#FF00FF'
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cor de fundo transparente para escurecer o conteúdo de fundo
      },
});