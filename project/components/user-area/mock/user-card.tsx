import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

type User = {
  nome?: string;
  foto?: string;
  lat?: number;
  lon?: number;
};

const UserCard = ({ nome, foto, lat, lon }: User) => {
  const router = useRouter();

  return (
    <View style={estilos.top}>
      <Pressable
        style={estilos.card}
        onPress={() => router.navigate("/PageHome")}
      >
        <View style={estilos.View}>
          <Image style={estilos.foto} source={{ uri: foto }} />
          <View style={estilos.teste}>
            <Text style={estilos.nome}>Olá, {nome}</Text>
            <Text style={estilos.coords}>
              {lat != null && lon != null
                ? `${lat.toFixed(4)}, ${lon.toFixed(4)}`
                : "Lat/Long indisponível"}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  teste:{
    width: 200 
  },

  top:{
    
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
    width: 80,
    height: 80,
    objectFit: "cover",
  },
  coords: {
  color: "#ffffff",
  fontSize: 14,
  marginTop: 4,
}
});

export default UserCard;
