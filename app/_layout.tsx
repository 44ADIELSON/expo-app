import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="WelcomePage" options={{ title: "Well" }} />
      <Stack.Screen name="CredentialsPage" options={{ title: "Login" }} />
      <Stack.Screen name="HomePage" options={{ headerShown: false }} />
      <Stack.Screen
        name="UserRegistrationPage"
        options={{ title: "Cadastrar-se" }}
      />
    </Stack>
  );
}
