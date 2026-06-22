import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface User  {
  nome?: string;
  foto?: string | null;
};

const UserCard = ({ nome, foto }: User) => {
  const router = useRouter();

  const renderAvatar = () => {
    if (foto) {
      return <Image style={estilos.foto} source={{ uri: foto }} />;
    }

    // Placeholder: círculo com iniciais
    const initials = nome ? nome.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U';
    return (
      <View style={estilos.placeholder}>
        <Text style={estilos.placeholderText}>{initials}</Text>
      </View>
    );
  };

  return (
    <View>
      <Pressable
        style={estilos.card}
        onPress={() => router.navigate("/PageHome")}
      >
        <View style={estilos.View}>
          <View>
            {renderAvatar()}
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
    borderRadius: 100,
    width: 50,
    height: 50,
    objectFit: "cover",
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9e9ea8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default UserCard;
