import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}  />
      <Stack.Screen name="well" options={{ title: 'Well' }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="userHome" options={{ title: 'Home' }} />
      <Stack.Screen name="TESTE" options={{ title: 'Teste' }} />
    </Stack>
  );
}
