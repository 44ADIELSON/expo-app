import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import Voltar from '../components/buttons/Voltar';

export default function Home() {
  return (
    <View style={estilos.view}>
      <Text style={estilos.text}>Bem Vindo</Text>
      <Voltar />
    </View>
  );
}

const estilos = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
      marginBottom: 12
  }
});
