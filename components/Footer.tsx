import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Footer = () => {
    const openLinkedInProfile = () => {
        const profileURL = 'https://br.linkedin.com/in/vinicius-pessoa';
        Linking.openURL(profileURL);
      };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openLinkedInProfile} style={styles.footer}>
        <Text style={styles.text}>Desenvolvido por Vinicius Pessoa © {new Date().getFullYear()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    width: '100%'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
});

export default Footer;