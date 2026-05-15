import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

export const ExploreButton = () => {
  const router = useRouter();

  return (
    <View style={estilos.View}>
      <Pressable
        style={estilos.ExploreButton}
        onPress={() => router.navigate("./userHome-screen")}
      >
        <Text style={estilos.ExploreButtonText}>Explorar</Text>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  View:{
    width: '85%',
  },
  ExploreButton: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 100,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

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

    backgroundColor: "#DE9817",
  },
  ExploreButtonText: {
    color: "#593D09",
    fontSize: 20,
    fontWeight: "bold",
  },
});
