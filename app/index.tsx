import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

import WellScreen from "./well-screen";

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
    justifyContent: "center"
  },
});
