import { View, Text, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

interface TypeLogo {
  iconColor?: string;
  textColor?: string;
}

export const Logo = ({ iconColor, textColor }: TypeLogo) => {
  return (
    <View style={styles.View}>
      <Ionicons name="sunny" size={30} color={iconColor} />
      <Text style={[styles.Text, { color: textColor }]}>SOLARIS</Text>
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
    paddingLeft: 10,
    paddingTop: 25,
  },
  Text: {
    fontSize: 20,
    letterSpacing: 14.5,
    fontFamily: "System",
  },
});

export default Logo;
