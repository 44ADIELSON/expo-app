import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export const NewUserButton = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable style={estilos.NewUser} onPress={() => router.push("/UserRegistrationPage")}>
        <Text style={estilos.NewUserText}>Criar nova conta</Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  NewUser: {
    alignItems: "center",
    justifyContent: "center",
  },
  NewUserText: {
    fontSize: 16,
  },
});
