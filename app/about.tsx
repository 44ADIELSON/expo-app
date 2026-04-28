import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function About() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Sobre</Text>
      <Link href="/" style={{ fontSize: 16, color: '#2563eb' }}>
        Voltar
      </Link>
    </View>
  );
}
