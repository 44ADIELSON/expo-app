import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import * as Location from "expo-location";

interface ClimaTeste {
  daily: { sunrise: string[]; sunset: string[] };
}

export const LocationButton = () => {
  const [erro, setErro] = useState<string>("");

  const ObterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return setErro("Permissão negada.");
      }

      const {
        coords: { latitude: lat, longitude: lon },
      } = await Location.getCurrentPositionAsync({});
      
      // Aqui você já tem as coordenadas (lat e lon) para usar
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

    //  Equivalente iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // 1px vertical
    },
    shadowOpacity: 0.25, // rgba(0,0,0,0.25)
    shadowRadius: 1, // 1px blur

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
