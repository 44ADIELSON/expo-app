import { View, Text, StyleSheet, TextInput } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const UserInput = () => {
  return (
    <View style={estilos.ViewAll}>
        <View style={estilos.ViewInput}>
          <TextInput
            style={estilos.input}
            placeholder="Endereço de e-mail"
            placeholderTextColor="#848484"
            underlineColorAndroid="transparent"
          />
        </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  ViewAll: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },

  input: {
    alignItems: "center",

    color: "#000",
    fontSize: 16,
  },

  ViewInput: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    borderRadius: 20,
    elevation: 2,

    minWidth: 330,
    minHeight:40,

    paddingLeft: 20
  },

  IconRotate: {
    transform: [{ rotate: "90deg" }],
  },
});
