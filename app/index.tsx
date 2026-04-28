import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Tela Inicial</Text>
      <Link href="/about" style={{ fontSize: 16, color: '#2563eb' }}>
        Ir para About
      </Link>
    </View>
  );
}
