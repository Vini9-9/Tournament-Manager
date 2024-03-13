import { StyleSheet } from 'react-native';

export const stylesComponent = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        minWidth: 600
      },
      cabecalho: {
        flexDirection: 'row',
        backgroundColor: '#7030A0',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: 500
      },
      textoCabecalho: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
      },
      texto: {
        flex: 1,
        textAlign: 'center',
      },
      textoTimes: {
        flex: 3, // Ajuste o valor conforme necessário para controlar a largura da célula do time
        maxWidth: 150, // Limita a largura máxima da célula do time
        textAlign: 'left', // Alinha o texto do time à esquerda
        flexWrap: 'wrap', // Adiciona quebra de linha ao texto do time
      },
      textoGrupo: {
        color: 'white',
        flex: 3, // Ajuste o valor conforme necessário para controlar a largura da célula do time
        maxWidth: 150, // Limita a largura máxima da célula do time
        textAlign: 'left', // Alinha o texto do time à esquerda
        flexWrap: 'wrap', // Adiciona quebra de linha ao texto do time
        fontWeight: 'bold'
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