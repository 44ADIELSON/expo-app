import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export const ExitButton = () => {
  const router = useRouter();

  return (
    <View style={styles.View}>
      <TouchableOpacity
        onPress={() => router.navigate("./login")}
        activeOpacity={0.5}
      >
        <Text
          style={[
            {
              letterSpacing: 5,
              fontWeight: 700,
              fontFamily: "System",
              fontSize: 15,
              color: "#f3f3ff",
            },
          ]}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    padding: 10,

    borderRadius: 15,

    backgroundColor: "#f3f3ff42",

    borderWidth: 1,
    borderColor: "white",
  },
});
