import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import SelecaoPerfil from "../project/components/user-area/mock/user-selection";

interface ClimaTeste {
  daily: { sunrise: string[]; sunset: string[] };
}

const UserHome = () => {
  const [dados, setDados] = useState<ClimaTeste | null>(null);
  const [erro, setErro] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return setErro("Permissão negada.");
        }

        const {
          coords: { latitude: lat, longitude: lon },
        } = await Location.getCurrentPositionAsync({});

        setLat(lat);
        setLon(lon);
        

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto&forecast_days=1`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("Erro na API");

        setDados(await response.json());
      } catch (e) {
        setErro("Falha ao processar os dados.");
      }
    })();
  }, []);

  // Renderizações de bloqueio (Erro ou Carregamento)
  if (erro)
    return (
      <View>
        <Text>{erro}</Text>
      </View>
    );
  if (!dados)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ImageBackground
      source={require("../assets/Gemini_Generated_Image_l7xwetl7xwetl7xw.png")}
      style={estilos.background}
      imageStyle={estilos.image}
    >
      <View style={estilos.View}>
        {lat != null && lon != null && (
          <SelecaoPerfil lat={lat} lon={lon} nome={""} foto={""} />
        )}
      </View>
    </ImageBackground>
  );
};

const estilos = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: "center",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  background: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  image: {
    resizeMode: "cover",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});

export default UserHome;
