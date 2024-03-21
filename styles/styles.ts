import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    backgroundColor: 'green',
    flex: 1,
    // backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 5,
    // marginVertical: 5
  },
  cabecalho: {
    backgroundColor: 'purple',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // backgroundColor: '#7030a0',
    // color: 'white'
  },
  texto: {
    flex: 1,
    textAlign: 'center',
  },
  localIcon: {
    marginRight: 5,
  },
});
  