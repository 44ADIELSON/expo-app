import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";

import * as Location from "expo-location";

export const LocationButton = () => {
  const ObterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada.");
        return;
      }

      const {
        coords: { latitude: lat, longitude: lon },
      } = await Location.getCurrentPositionAsync({});

      console.log("Coordenadas:", lat, lon);
    } catch (error) {
      console.log(error, "Falha!");
    }
  };

  return (
    <View>
      <Pressable style={estilos.ExploreButton} onPress={ObterLocalizacao}>
        <Text style={estilos.ExploreButtonText}>
          Usar Localização Atual (GPS)
        </Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  ExploreButton: {
    alignItems: "center",
    justifyContent: "center",

    width: 300,
    height: 50,

    borderRadius: 100,
    elevation: 2,

    padding: 10,

    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,

    backgroundColor: "#DE9817",

    fontFamily: "System",
  },
  ExploreButtonText: {
    color: "#593D09",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});