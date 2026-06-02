import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export const ExitButton = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable style={estilos.ExitButton} onPress={() => router.back()}>
        <Text style={estilos.ExitButtonText}>Sair</Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  ExitButton: {
    alignItems: "center",
    justifyContent: "center",

    minWidth: 80,
    height: 34,

    borderRadius: 15,
    elevation: 2,

    padding: 6,

    backgroundColor: "#7f7f7f",
  },
  ExitButtonText: {
    color: "#f3f3ff",
    fontSize: 14,
    fontWeight: "600",
  },
});