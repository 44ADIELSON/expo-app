import React from "react";

import { View, StyleSheet } from "react-native";

import WellScreen from "./WelcomePage";

export default function Home() {
  return (
    <View style={estilos.container}>
      <WellScreen />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
