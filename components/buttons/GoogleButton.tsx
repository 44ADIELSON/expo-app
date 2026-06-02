import { Text, StyleSheet, TouchableOpacity } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

export const GoogleButton = () => {
  return (
    <TouchableOpacity style={estilos.button} activeOpacity={0.7}>
      <AntDesign name="google" size={24} color="black" />
      <Text style={estilos.Text}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,

    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#747775",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,

    minWidth: 330,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  Text: {
    color: "#1f1f1f",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },
});