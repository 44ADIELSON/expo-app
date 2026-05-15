import { View, Text, Pressable, StyleSheet } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

export const ContinueWithGoogle = () => {
  return (
    <View style={estilos.View}>
      <AntDesign name="google" size={24} color="black" />
      <Text style={estilos.Text}>Continue with Google</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  View: {
    width: "85%",

    flexDirection: 'row',
    alignItems: "center",
    gap: 12,

    borderWidth: 0.5,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 20,

    backgroundColor: "#fff",
  },
  Text: {
    fontSize: 18,
    fontWeight: '700'
  },
});
