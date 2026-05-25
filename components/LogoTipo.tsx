import { View, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export const LogoCreate = () => {
  return (
    <View style={styles.View}>
      <Ionicons name="sunny" size={30} color="black" />
      <Text style={styles.Text}>SOLARIS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'flex-start',
    gap: 20,

    minWidth: 350,
    paddingLeft: 10
  },
  Text: {
    fontSize: 20,
    letterSpacing: 14.5,
    fontFamily: "System",
  },
});
