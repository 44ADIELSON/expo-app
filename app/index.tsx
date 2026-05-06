import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import TestScreen from '../project/pages/test-screen';

export default function Home() {
  return (
    <View style={estilos.view}>
      <TestScreen />  
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
