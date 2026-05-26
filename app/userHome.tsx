import { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import SelecaoPerfil from "../components/user-area/mock/user-selection";

import { LogoCreate } from "../components/LogoTipo";

/* @hide */
import * as Device from "expo-device";
/* @end */
import * as Location from "expo-location";

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
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

        let addresses = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (addresses && addresses.length > 0) {
          setAddress(
            addresses[0].formattedAddress ||
              `${addresses[0].street}, ${addresses[0].city}`,
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
      <View style={styles.contentContainer}>
        
        <LogoCreate iconColor="#FF9500" textColor="#ffffff" />

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
            <Text style={styles.addressText}>{address}</Text>
          )}
        </View>

        <View style={styles.componentWrapper}>
          <SelecaoPerfil />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002270",
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
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    padding: 15,
    minHeight: 50,
  },
  componentWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  loader: {
    padding: 5,
  },
  addressText: {
    fontFamily: "System",
    fontSize: 15,
    textAlign: "center",
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
