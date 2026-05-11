import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

type User = {
  nome: string;
  foto: string;
};

const UserCard = ({ nome, foto }: User) => {
  const router = useRouter();

  return (
    <View style={estilos.top}>
      <Pressable
        style={estilos.card}
        onPress={() => router.navigate("/PageHome")}
      >
        <View style={estilos.View}>
          <Image style={estilos.foto} source={{ uri: foto }} />
          <View>
            <Text style={estilos.nome}>{nome}</Text>
            <Text style={estilos.nome}>AQUI A LAT E LON</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  top:{
    flex: 1,
    justifyContent: "center",
  },
  View: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    gap: 25,
    padding: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
  },
  nome: {
    color: "#ffffff",
    fontSize: 20,
  },
  foto: {
    borderRadius: 60,
    width: 100,
    height: 100,
    objectFit: "cover",
  },
});

export default UserCard;
