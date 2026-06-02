import { View, Text, StyleSheet, Pressable } from "react-native";

import { useRouter } from "expo-router";

export const EnterButton = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        style={estilos.EnterButton}
        onPress={() => router.navigate("/HomePage")}
      >
        <Text style={estilos.EnterButtonText}>Entrar</Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  EnterButton: {
    alignItems: "center",
    justifyContent: "center",

    minWidth: 330,
    height: 50,

    borderRadius: 15,
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

    backgroundColor: "#242440",

    fontFamily: "System",
  },
  EnterButtonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5
  },
});