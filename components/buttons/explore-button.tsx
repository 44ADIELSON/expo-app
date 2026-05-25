import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";

export const ExploreButton = () => {
  const router = useRouter();

  return (
    <View style={estilos.View}>
        <TouchableOpacity
          onPress={() => router.navigate("./Login")}
          style={estilos.ExploreButton}
          activeOpacity={0.7}
        >
          <Text style={estilos.ExploreButtonText}>Explorar</Text>
        </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  View: {
    width: "85%",
    alignItems: 'center'
  },
  ExploreButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 330,

    borderRadius: 20,

    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,

    backgroundColor: "#242440",
  },
  ExploreButtonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "System",
  },
});
