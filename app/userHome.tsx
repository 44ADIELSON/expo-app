import { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { LogoCreate } from "../components/LogoTipo";
import { CustomDrawer, VisibilityOptions } from "../components/input-drawer/custom-drawer";
import { NewDateComponent } from "../components/new-date-component";
import { ExitButton } from "../components/buttons/exit-button";

import SelecaoPerfil from "../components/user-area/mock/user-selection";

/* @hide */
import * as Device from "expo-device";
/* @end */
import * as Location from "expo-location";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAddressData() {
      try {
        setLoading(true);

        /* @hide */
        if (Platform.OS === "android" && !Device.isDevice) {
          setErrorMsg(
            "Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
          );
          return;
        }
        /* @end */

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("A permissão para acessar a localização foi negada.");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});

        setCoords({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        let addresses = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (addresses && addresses.length > 0) {
          setAddress(
            `${addresses[0].subregion}, ${addresses[0].region},${addresses[0].country}`,
          );
        } else {
          setAddress("Endereço não encontrado.");
        }
      } catch (error) {
        setErrorMsg("Erro ao buscar localização.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAddressData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/FUNDO-GRADIENTE.png")}
        style={styles.background}
      >
        <View style={[{ marginTop: 25 }]}>
          <LogoCreate iconColor="#F8B03E" textColor="#ffffff" />
        </View>
        <View style={[styles.ViewTop, { flexDirection: "row" }]}>
          <SelecaoPerfil />
          <ExitButton />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={styles.loader}
              />
            ) : errorMsg ? (
              <Text style={styles.errorText}>{errorMsg}</Text>
            ) : (
              <View style={styles.address}>
                <View
                  style={[
                    { flexDirection: "row", gap: 15, alignItems: "center" },
                  ]}
                >
                  <Text style={styles.addressText}>{address}</Text>
                  <FontAwesome6 name="location-dot" size={20} color="#f5f5f5" />
                </View>
                <View>
                  <NewDateComponent />
                </View>
              </View>
            )}
          </View>

          <View style={styles.componentWrapper}>
            <View style={styles.Cards}>
                <CustomDrawer
                  bgImage={require("../assets/bg-card.png")}
                  ImageWay={require("../assets/custom-drawer-sunrise.png")}
                  textInformation="Nascer do Sol"
                  
                  latitude={coords?.latitude}
                  longitude={coords?.longitude}
                />
                <CustomDrawer
                  BColor="#242440"
                  ImageWay={require("../assets/custom-drawer-sunset.png")}
                  textInformation="Pôr do Sol"
                  
                  latitude={coords?.latitude}
                  longitude={coords?.longitude}
                />
            </View>

            <View>
              <Text style={[{letterSpacing: 6, color: "#f3f3ff",}]}>Quadro de Visibilidade</Text>
            </View>
            <VisibilityOptions
              latitude={coords?.latitude}
              longitude={coords?.longitude}
              style={{ width: 320, marginTop: 8 }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViewTop: {
    alignItems: "center",
    justifyContent: "space-between",

    padding: 5,

    minWidth: "100%",
  },
  address: {
    alignItems: "center",
    flexDirection: "column",


  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 15,
    minHeight: 50,
  },
  componentWrapper: {
    flexDirection: "column",
    alignItems: "center",

    gap: 35
  },
  loader: {
    padding: 5,
  },
  addressText: {
    fontFamily: "System",
    fontSize: 20,
    fontWeight: 700,
    color: "#f5f5f5",

    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
  Cards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },
});
