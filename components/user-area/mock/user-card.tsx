import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface User  {
  nome?: string;
  foto?: string;
};

const UserCard = ({ nome, foto }: User) => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        style={estilos.card}
        onPress={() => router.navigate("/PageHome")}
      >
        <View style={estilos.View}>
          <View>
            <Image style={estilos.foto} source={{ uri: foto }} />
          </View>
          <View>
            <Text style={estilos.nome}>Olá, {nome}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  View: {
    flexDirection: "row",
    alignItems: "center",

    gap: 25,
    padding: 10,
    fontFamily: "System",
  },
  card: {
    alignItems: "center",
  },
  nome: {
    color: "#ffffff",
    fontSize: 20,
  },
  foto: {
    borderRadius: 60,
    width: 80,
    height: 80,
    objectFit: "cover",
  },
});

export default UserCard;
