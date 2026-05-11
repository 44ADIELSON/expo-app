import React from 'react';
import { Stack } from 'expo-router';


export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Test Screen' }} />
      <Stack.Screen name="login-screen" options={{ title: 'Login Screen' }} />
      <Stack.Screen name="well-screen" options={{ title: 'Well Screen' }} />
      <Stack.Screen name="userHome-screen" options={{ title: 'Home Screen' }} />
    </Stack>
  );
}
